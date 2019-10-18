/**
 * Controller for users model
 * 
 * @author Kelvin Yin
 */

const passwordHash = require('password-hash');
const jwt          = require('jsonwebtoken');
const mysql        = require('mysql2');
const moment       = require('moment');

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

        // To store errors
        var errors = [];

        // Get users with email.
        const [users, fields] = await DB.execute('SELECT * FROM `users` WHERE `email` = ?', [email]);

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
                        eth_account     : '',
                        eth_private_key : '',
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

        // Check if user exists
        if (users.length == 0) {
            errors.push(
                {
                    message: 'The account is not registered yet.',
                    field: 'email'
                }
            );
        }

        const user = users[0];

        // Validate user password
        if (passwordHash.verify(password, user.password) == false) {
            errors.push(
                {
                    message: 'Incorrect password.',
                    field: 'password'
                }
            );
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
                    email : user.email
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
                        email: user.email
                    }
                }
            );

        }
        

    },

    connectEthereumWallet: function(req, res) {

        // 

    }

}