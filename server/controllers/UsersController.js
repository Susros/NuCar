/**
 * Controller for users routes
 * 
 * @author Kelvin Yin
 */

const passwordHash = require('password-hash');
const jwt          = require('jsonwebtoken');
const mysql        = require('mysql2');
const moment       = require('moment');
const CarNet       = require('../blockchain/js/CarNet');

var UserController = module.exports = {

    /**
     * Register users
     * 
     * POST: /users/register
     *
     * Post Data:
     *  - first_name
     *  - last_name
     *  - email
     *  - password
     *  - confirm_password
     *  - type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    register: async function(req, res) {

        // Get all data from post
        const firstName       = req.body.first_name;
        const lastName        = req.body.last_name;
        const email           = req.body.email;
        const password        = req.body.password;
        const confirmPassword = req.body.confirm_password;
        const userType        = req.body.user_type;

        let ethAccount = req.body.ethereum_address;
        let ethPrivateKey = req.body.ethereum_private_key;

        // Make sure there is '0x' at the front
        if (ethAccount.substring(0, 2) != '0x') {
            ethAccount = '0x' + ethAccount;
        }

        if (ethPrivateKey.substring(0, 2) != '0x') {
            ethPrivateKey = '0x' + ethPrivateKey;
        }

        // For connecting to ethereum account
        CarNet.init();

        // To store errors
        var errors = [];

        // Get users with email.
        const [users, fields] = await DB.execute('SELECT * FROM `users` WHERE `email` = ? OR `eth_account` = ?', [email, ethAccount]);

        // Check if user already exists
        if (users.length > 0) {
            errors.push(
                {
                    message: "User already exists.",
                    field: "email"
                }
            );
        } else {

            // Validate email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
                errors.push(
                    {
                        message: "Invalid email address.",
                        field: "email"
                    }
                )
            }

            // Check if two passwords are the same
            if (password == confirmPassword) {

                // Check the number of password characters
                // Minimum required 8
                if (password.length < 8) {
                    errors.push(
                        {
                            message: "Password must be at least 8 characters.",
                            field: "password"
                        }
                    );
                }

            } else {
                errors.push(
                    {
                        message: "Passwords do not match.",
                        field: "password"
                    }
                );
            }

            // Validate the user type is correct
            if (userType != 'owner' && userType != 'borrower') {
                errors.push(
                    {
                        message: "Invalid user type.",
                        field: "user_type"
                    }
                );
            }

            // Verify ethereum account
            if (ethAccount.length < 40 || ethAccount.length > 42) {
                errors.push(
                    {
                        message: "Invalid Ethereum Address",
                        field: "ethereum_address"
                    }
                );
            } else if (ethPrivateKey.length < 64 || ethPrivateKey.length > 66) {
                errors.push(
                    {
                        message: "Invalid Ethereum Private Key",
                        field: "ethereum_private_key"
                    }
                );
            } else {

                if (CarNet.verifyAccount(ethAccount, ethPrivateKey) === false) {
                    errors.push(
                        {
                            message: "Could not connect to Ethereum account.",
                            field: "ethereum_address"
                        }
                    )
                }
            }
        }

        // Check if validations are all passed
        if (errors.length > 0) {
            
            // Respond with errors
            res.status(400).json(
                {
                    errors: errors
                }
            );

        } else {
            // Store in database
            await DB.execute(
                mysql.format(
                    'INSERT INTO `users` SET ?',
                    {
                        first_name      : firstName,
                        last_name       : lastName,
                        email           : email,
                        password        : passwordHash.generate(password),
                        type            : userType,
                        img             : '',
                        eth_account     : ethAccount,
                        eth_private_key : ethPrivateKey,
                        token           : '',
                        created_at      : moment().format('YYYY-MM-DD')
                    }
                )
            );

            // Login after succesful registration
            UserController.login(req, res);
        }
    },

    /**
     * Login users
     * 
     * POST: /users/login
     * 
     * Post Data:
     *  - email
     *  - password
     * 
     * @param {HTTPRequest} req 
     * @param {HTTPResponse} res 
     */
    login: async function(req, res) {

        // Get all data from post
        const email    = req.body.email;
        const password = req.body.password;

        // To store errors
        var errors = []

        // Get user
        const [users, fields] = await DB.execute('SELECT * FROM `users` WHERE `email` = ?', [email]);

        var user;

        // Check if user exists
        if (users.length == 0) {
            errors.push(
                {
                    message: 'The account is not registered yet.',
                    field: 'email'
                }
            );
        } else {

            user = users[0];

            // Validate user password
            if (passwordHash.verify(password, user.password) == false) {
                errors.push(
                    {
                        message: 'Incorrect password.',
                        field: 'password'
                    }
                );
            }
        }

        // Check if validation passed
        if (errors.length > 0) {
            res.status(400).json(
                {
                    errors: errors
                }
            );
        } else {

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

            // Store token in database
            await DB.execute('UPDATE `users` SET `token` = ? WHERE `email` = ?', [token, email]);

            // Set token in cookie
            res.cookie('lg_token', token, { httpOnly: true });

            res.status(200).json(
                {
                    data: {
                        id : user.id.toString(),
                        email: user.email,
                        eth_account: user.eth_account
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