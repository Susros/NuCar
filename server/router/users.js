/**
 * API Router for users
 * 
 * @author Kelvin Yin
 */

const express = require('express');

// Middleware
const auth = require('./middleware/auth');
const onlyOwner = require('./middleware/onlyOwner');
const onlyBorrower = require('./middleware/onlyBorrower');

// Get express router
const router = express.Router();

// Get users controller
const usersController = require('../controllers/UsersController');

// User Registration
router.post('/register', usersController.register);

// User Login
router.post('/login', usersController.login);

// Check if logged in
router.get('/login/check', auth, function(req, res) {
    res.status(200).json(
        {
            data: {
                isLoggedin: true
            }
        }
    );
});

// Get owner cars
router.get('/cars', onlyOwner, usersController.getCars);

// Get rentals
router.get('/rentals', onlyBorrower, usersController.getRentals);

// Get user information
router.get('/', auth, usersController.getUser);

module.exports = router;