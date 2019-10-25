/**
 * This controllers handles Users APIs.
 * 
 * @author Kelvin Yin
 */

const jwt          = require('jsonwebtoken');
const UserDAO      = require('../model/UserDAO');
const Validator   = require('../helpers/Validator');

var UserController = module.exports = {

    /**
     * This method handle user registration.
     * 
     * POST: /users/register
     *
     * Form Data:
     *  - first_name
     *  - last_name
     *  - email
     *  - password
     *  - confirm_password
     *  - type
     * 
     * @param {Request}  req 
     * @param {Response} res 
     */
    register: async (req, res) => {

        // Validate form data inputs
        const { errors, data } = await Validator.validate(req.body, { email: 'unique' });
        
        if (errors.length > 0) {
            res.status(400).json({ errors });
        } else {
            await UserDAO.addUser(data);

            // Login
            UserController.login(req, res);
        }
        
    },

    /**
     * This method handle user login.
     * 
     * POST: /users/login
     * 
     * Form Data:
     *  - email
     *  - password
     * 
     * @param {HTTPRequest} req 
     * @param {HTTPResponse} res 
     */
    login: async function(req, res) {

        // Validate form data input
        let { errors, data } = await Validator.validate(req.body, { email: 'exists', password: 'verify' });

        // Check if validation passed
        if (errors.length > 0) {
            res.status(400).json({ errors })
        } else {

            const user = await UserDAO.getUserByEmail(data.email);

            // Generate user token
            const token = jwt.sign(
                {
                    id : user.id.toString(),
                    email : user.email,
                    eth_account : user.eth_account
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '7 days'
                }
            );

            // Add token into data
            data.token = token;

            // Update user database
            await UserDAO.updateUser(data, user.id);

            // Set token in cookie
            res.cookie('lg_token', token, { httpOnly: true });

            res.status(200).json(
                {
                    data: {
                        loggedin: true
                    }
                }
            );

        }
    },

    /**
     * Get list of owner cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getCars: async function(req, res) {
        
        // Get token decoded
        const token_decoded = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const [carsQueryResults, carsQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `user_id` = ?', [token_decoded.id]);

        var data = [];

        if (carsQueryResults.length > 0) {
            data = carsQueryResults;
        }

        res.status(200).json(
            {
                data: data
            }
        );
    },

    /**
     * Get list of rented cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getRentals: async function(req, res) {

        // Get token decoded
        const token_decoded = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const [rentalsQueryResults, rentalsQueryFields] = await DB.execute('SELECT * FROM `rental` WHERE `user_id` = ? AND `return_at` IS NULL', [token_decoded.id]);

        data = []

        if (rentalsQueryResults.length > 0) {

            for(let x in rentalsQueryResults) {
                let rental = rentalsQueryResults[x];

                const [carsQueryResults, carsQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `id` = ?', [rental.car_id]);
                
                if (carsQueryResults.length > 0) {
                    let carData = carsQueryResults[0];
                    
                    carData.rental_id = rental.id;

                    data.push(carData);
                }
            }

        }

        res.status(200).json(
            {
                data: data
            }
        );

    },

    /**
     * Get user information 
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getUser: async function(req, res) {

        // Get token decoded
        const token_decoded = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `id` = ?', [token_decoded.id]);

        const test = UserDAO.getUserById(token_decoded.id);

        if (userQueryResults.length > 0) {

            const user = userQueryResults[0];

            res.status(200).json(
                {
                    data: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        eth_account: user.eth_account,
                        type: user.type
                    }
                }
            )
        } else {
            res.status(404).json({ message: "User not found." })
        }
    }
}