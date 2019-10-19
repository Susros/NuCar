/**
 * Controller for cars routes
 * 
 * @author Kelvin Yin
 */

const passwordHash = require('password-hash');
const jwt          = require('jsonwebtoken');
const mysql        = require('mysql2');
const moment       = require('moment');
const CarNet       = require('../blockchain/js/CarNet');

var CarsController = module.exports = {

    /**
     * Add new car
     * 
     * @param {HTTPRequest}  req 
     * @param {HTTPResponse} res 
     */
    addCar: function(req, res) {

        // Get data from post
        console.log(req.body);

        res.json({
            data: "Testing";
        })

    }

}