/**
 * API Router for cars
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

const express = require('express');

// Middleware
const onlyOwner = require('./middleware/onlyOwner');
const onlyBorrower = require('./middleware/onlyBorrower');

// Get express router
const router = express.Router();

// Get cars controller
const carsController = require('../controllers/CarsController');

// Add Car
router.post('/add', onlyOwner, carsController.addCar);

// Rent Car
router.post('/:id/book', onlyBorrower, carsController.rentCar);

// Return Car
router.post('/rental/:id/return', onlyBorrower, carsController.returnCar);

// Get cars list
router.get('/', carsController.getCarsList);

// Get individual car
router.get('/:id', carsController.getCar)


module.exports = router;