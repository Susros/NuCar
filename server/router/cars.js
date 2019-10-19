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
router.post('/add', carsController.addCar);

// Rent Car

// Return Car

// Get cars list

// Get my cars list



module.exports = router;