/**
 * Controller for cars routes
 * 
 * @author Kelvin Yin
 */

const passwordHash = require('password-hash');
const jwt          = require('jsonwebtoken');
const mysql        = require('mysql2');
const moment       = require('moment');
const CarNet       = require('../blockchain/js/CarNet');
const crypto       = require('crypto');

var CarsController = module.exports = {

    /**
     * Add new car
     * 
     * Precondition: User has already logged in and is owner type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    addCar: function(req, res) {

        // Get data from post
        // [TODO: This need to be validated]
        let postData = req.body;

        // Get token decoded
        const token_decoded = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        postData.user_id = token_decoded.id;
        postData.hash = crypto.createHash('md5').update(postData.model + postData.make + postData.user_id + (new Date()).getTime()).digest('hex');
        postData.created_at = moment().format("YYYY-MM-DD");

        // Get user private key
        DB.execute(
            mysql.format('SELECT `eth_private_key` FROM `users` WHERE `id` = ?', [token_decoded.id]), 
            (err, results, fields) => {
                if (err) throw err;

                const privateKey = results[0].eth_private_key;

                // Add to blockchain
                CarNet.init();
                CarNet.addCar(postData.hash, token_decoded.eth_account, privateKey)
                    .then(transactionResult => {
                        console.log(transactionResult);

                        // Add information into database
                        DB.execute(
                            mysql.format(
                                'INSERT INTO `cars` SET ?',
                                postData
                            ),
                            (insertErr, insertResults, insertFields) => {
                                if (insertErr) throw insertErr;

                                res.status(200).json(
                                    {
                                        data : {
                                            transaction: transactionResult
                                        }
                                    }
                                );
                            }
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        );
    },

    /**
     * Rent a car
     * 
     * Precondition: User has already been logged in and is borrower type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    rentCar: async function(req, res) {

        // Get token decoded
        const token_decoded = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
    
        // Get car id
        const carId = req.params.id;

        // Get car
        const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `status` = ? AND `id` = ?', ['available', carId]);

        if (carQueryResults.length > 0) {

            const car = carQueryResults[0];

            // Get owner details
            const [ownerQueryResults, ownerQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `id` = ?', [car.user_id]);
            const owner = ownerQueryResults[0];

            // Get user detail
            const [userQueryResult, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `id` = ?', [token_decoded.id]);
            const user = userQueryResult[0];

            // Add to blockchain
            CarNet.init();
            CarNet.rentCar(car.hash, owner.eth_account, user.eth_account, user.eth_private_key)
                .then(async transactionResult => {
                    
                    // Update car status
                    await DB.execute('UPDATE `cars` SET `status` = ? WHERE `id` = ?', ['unavailable', carId]);

                    // Add rental information
                    await DB.execute(
                        mysql.format(
                            'INSERT INTO `rental` SET ?',
                            {
                                car_id: carId,
                                user_id: user.id,
                                return_at: null,
                                created_at: moment().format("YYYY-MM-DD")
                            }
                        )
                    );

                    console.log(transactionResult);

                    res.status(200).json(
                        {
                            data: transactionResult
                        }
                    )

                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            res.status(404).json(
                {
                    message: "Car not found."
                }
            )
        }

    },

    /**
     * Get list of cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getCarsList: function(req, res) {

        // Get all available cars
        DB.query('SELECT * FROM `cars` WHERE `status` = "available" ORDER BY `id`', (err, results, fields) => {
            if (err) throw err;

            res.status(200).json(
                {
                    data: results
                }
            );
        });

    },

    /**
     * Get individual car
     * 
     * @param {HTTPRequest}  req
     * @param {HTTPResponse} res
     */
    getCar: function(req, res) {

        // Get car id
        const carId = req.params.id;

        // Get car
        DB.query(
            mysql.format(
                'SELECT * FROM `cars` WHERE `status` = "available" AND `id` = ?', [carId]
            ), (err, results, fields) => {
                if (results.length > 0) {
                    res.status(200).json({
                        data: results[0]
                    });
                } else {
                    res.status(404).json({
                        message: "Car not found"
                    });
                }
            }
        )

    }

}