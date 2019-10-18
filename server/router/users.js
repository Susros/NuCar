/**
 * API Router for users
 * 
 * @author Kelvin Yin
 */

const express = require('express');

// Get express router
const router = express.Router();

// Get users controller
const usersController = require('../controllers/UsersController');

// User Registration
router.post('/register', usersController.register);

// User Login
router.post('/login', usersController.login);

// Add user ethereum wallet


module.exports = router;