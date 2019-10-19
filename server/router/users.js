/**
 * API Router for users
 * 
 * @author Kelvin Yin
 */

const express = require('express');

// Middleware
const authMiddleware = require('./middleware/auth');

// Get express router
const router = express.Router();

// Get users controller
const usersController = require('../controllers/UsersController');

// User Registration
router.post('/register', usersController.register);

// User Login
router.post('/login', usersController.login);

// Check if logged in
router.get('/login/check', authMiddleware, function(req, res) {
    res.status(200).json(
        {
            data: {
                isLoggedin: true
            }
        }
    );
});

module.exports = router;