/**
 * API Router for cars
 * 
 * @author Kelvin Yin
 */

const express = require('express');

// Middleware
const onlyOwnerMiddleware = require('./middleware/onlyOwner');
const onlyBorrowerMiddleware = require('./middleware/onlyBorrower');

// Get express router
const router = express.Router();

// Get cars controller
const carsController = require('../controllers/CarsController');

// Add Car
router.post('/add', onlyOwnerMiddleware, carsController.addCar);

// Rent Car
router.post('/:id/book', onlyBorrowerMiddleware, carsController.rentCar);

// Return Car

// Get cars list
router.get('/', carsController.getCarsList);

// Get individual car
router.get('/:id', carsController.getCar)

// Get my cars list



module.exports = router;