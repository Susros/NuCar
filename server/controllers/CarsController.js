/**
 * Controller for cars routes
 * 
 * @author Kelvin Yin
 */

const jwt       = require('jsonwebtoken');
const moment    = require('moment');
const CarNet    = require('../blockchain/js/CarNet');
const crypto    = require('crypto');

const UserDAO    = require('../model/UserDAO');
const CarDAO     = require('../model/CarDAO');
const RentalDAO  = require('../model/RentalDAO');
const FeatureDAO = require ('../model/FeatureDAO');

module.exports = {

    /**
     * Add new car
     * 
     * Precondition: User has already logged in and is owner type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    addCar: async (req, res) => {

        // Get data from post
        // [TODO: This need to be validated]
        let formData = req.body;

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        formData.user_id = token_decoded.id;
        formData.hash = crypto.createHash('md5').update(postData.model + postData.make + postData.user_id + (new Date()).getTime()).digest('hex');

        // Get user
        const user = await UserDAO.getUserById(T.id);

        // Add to blockchain
        CarNet.init();
        CarNet.addCar(postData.hash, T.eth_account, user.eth_private_key)
        .then(async transactionResult => {

            // Add to database
            await CarDAO.addCar(postData);

            res.status(200).json({ data: transactionResult })
        })
        .catch(err => {
            console.log(err);
        });
    },

    /**
     * Rent a car
     * 
     * Precondition: User has already been logged in and is borrower type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    rentCar: async (req, res) => {

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
    
        // Get car id
        const carId = req.params.id;

        // Get car

        const car = await CarDAO.getCarById(carId);

        if (Object.keys(car).length > 0 && car.status == 'available') {

            // Get owner details
            const owner = await UserDAO.getUserById(car.user_id);

            // Get user detail
            const user = await UserDAO.getUserById(T.id);

            // Add to blockchain
            CarNet.init();
            CarNet.rentCar(car.hash, owner.eth_account, user.eth_account, user.eth_private_key)
            .then(async transactionResult => {
                
                // Update car status
                await CarDAO.updateCar({ status: 'unavailable' }, carId);

                // Add rental information
                await RentalDAO.addRental({ car_id: carId, user_id: user.id });

                res.status(200).json({ data: transactionResult });

            })
            .catch(err => {
                console.log(err);
            });

        } else {
            res.status(404).json({ message: "Car not found." });
        }

    },

    /**
     * Return the car
     * 
     * Precondition: User has already logged in and is borrower type
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    returnCar: async (req, res) => {
        
        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
    
        // Get rental id
        const rentalId = req.params.id;

        // Get rental
        const rental = await RentalDAO.getRentalById(rentalId);

        if (Object.keys(rental).length > 0) {

            // Get Car
            const car = await CarDAO.getCarById(rental.car_id);

            // Make sure car status is unavailable
            if (car.status == 'unavailable') {
    
                // Get owner details
                const owner = await UserDAO.getUserById(car.user_id);
    
                // Get user detail
                const user = await UserDAO.getUserById(T.id);
    
                // Add to blockchain
                CarNet.init();
                CarNet.returnCar(car.hash, owner.eth_account, user.eth_account)
                .then(async transactionResult => {

                    // Update car status
                    await CarDAO.updateCar({ status: 'available' }, car.id);

                    // Update rental
                    await RentalDAO.updateRental({ returned_at: moment().format('YYYY-MM-DD') }, rentalId);

                    res.status(200).json({ data: transactionResult });

                })
                .catch(err => {
                    console.log(err);
                });

            } else {
                res.status(404).json({ message: "Car not found." });
            }

        } else {
            res.status(404).json({ message: "Rental not found." });
        }

    },

    /**
     * Get list of cars
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    getCarsList: async (req, res) => {

        // Get all available cars
        let cars = await CarDAO.getAvailableCars();

        // Get number of booking from the cars
        for(let i = 0; i < cars.length; i++) {
            const rentals = await RentalDAO.getRentalsByCarId(cars[i].id);
            cars[i].num_booking = rentals.length;
        }

        res.status(200).json({ data: cars });

    },

    /**
     * Get individual car
     * 
     * @param {HTTPRequest}  req
     * @param {HTTPResponse} res
     */
    getCar: async (req, res) => {

        // Get car id
        const carId = req.params.id;

        let car = await CarDAO.getCarById(carId);

        // Get rental informaion of that car
        const rentals = await RentalDAO.getRentalsByCarId(carId);
        
        car.num_booking = rentals.length;

        if (Object.keys(car).length > 0) {
            res.status(200).json({ data: car });
        } else {
            res.status(400).json({ message: 'Car not found.' });
        }

    },

    /**
     * Get all car features
     * 
     * @param {HTTPRequest}  req
     * @param {HTTPResponse} res
     */
    getFeatures: async (req, res) => {
        const features = await FeatureDAO.getFeatures();
        res.status(200).json({ data: features });
    }

}