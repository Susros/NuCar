/**
 * Controller for users model
 * 
 * @author Kelvin Yin
 */

const passwordHash = require('password-hash');
const jwt          = require('jsonwebtoken');

module.exports = {

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
        var error = [];

        // Get users with email.
        const [users, fields] = await DB.execute(
            'SELECT * FROM `users` WHERE `email` = ?',
            [email]
        );

        // Check if user already exists
        if (users.length > 0) {
            error.push(
                {
                    message: "User already exists.",
                    field: "email"
                }
            );
        } else {

            // Validate email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
                error.push(
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
                    error.push(
                        {
                            message: "Password must be at least 8 characters.",
                            field: "password"
                        }
                    );
                }

            } else {
                error.push(
                    {
                        message: "Passwords do not match.",
                        field: "password"
                    }
                );
            }

            // Validate the user type is correct
            if (userType != 'owner' && userType != 'borrower') {
                error.push(
                    {
                        message: "Invalid user type.",
                        field: "user_type"
                    }
                );
            }
        }

        // Check if validations are all passed
        if (error.length > 0) {
            
            // Respond with errors
            res.status(400).json(error);

        }

        res.status(200).json(
            {
                data: {
                    test: "Testing"
                }
            }
        )
    }

}