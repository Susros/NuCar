/**
 * This controllers handles Users APIs.
 * 
 * @author Kelvin Yin
 */

const jwt       = require('jsonwebtoken');
const UserDAO   = require('../model/UserDAO');
const CarDAO    = require('../model/CarDAO');
const RentalDAO = require('../model/RentalDAO');
const Validator = require('../helpers/Validator');

var UserController = module.exports = {

    /**
     * This method handle user registration.
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
     * Form Data:
     *  - email
     *  - password
     * 
     * @param {HTTPRequest} req 
     * @param {HTTPResponse} res 
     */
    login: async (req, res) => {

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
     * Check if the user is already loggedin.
     * 
     * This method will only be called when the auth middleware
     * validation is passed.
     * 
     * @param {HTTPRequest}  req
     * @param {HTTPResponse} res
     */
    isLoggedin: async(req, res) => {
        res.status(200).json(
            {
                data: {
                    isLoggedin: true
                }
            }
        );
    },

    /**
     * Get list of owner cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getCars: async (req, res) => {
        
        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const cars = await CarDAO.getCarsByUserId(T.id);

        res.status(200).json({ data: cars });
    },

    /**
     * Get list of rented cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getRentals: async (req, res) => {

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const rentals = await RentalDAO.getCurrentRentals(T.id);

        data = []

        if (rentals.length > 0) {

            for(let x in rentals) {
                let rental = rentalsQueryResults[x];

                const car = await CarDAO.getCarById(rental.car_id);

                if (Object.keys(car).length > 0) {
                    let carData = car;
                    carData.rental_id = rental.id;
                    data.push(carData);
                }
            }

        }

        res.status(200).json({ data });

    },

    /**
     * Get user information 
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getUser: async (req, res) => {

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const user = await UserDAO.getUserById(T.id);

        if (Object.keys(user).length > 0) {
            res.status(200).json({
                data: {
                    id          : user.id,
                    first_name  : user.first_name,
                    last_name   : user.last_name,
                    email       : user.email,
                    eth_account : user.eth_account,
                    type        : user.type
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    }
}