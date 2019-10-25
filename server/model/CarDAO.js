/**
 * Car Data Access Object
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    /**
     * Add car into database.
     * 
     * This method insert car data into database.
     * 
     * @param {Object} carData
     * 
     * @return Promise.
     */
    addCar: async (carData) => {

        // Add created date
        carData.created_at = moment().format("YYYY-MM-DD");

        return await DB.execute(mysql.format('INSERT INTO `cars` SET ?', carData));

    },

    /**
     * Update car data in database.
     * 
     * This method update data in the database.
     * 
     * @param {Object} carData
     * @param {int}    id      Car ID.
     * 
     * @return Promise.
     */
    updateCar: async (carData, id) => {
        return await DB.execute(mysql.format('UPDATE `cars` SET ? WHERE `id` = ?', [carData, id]));
    },

    /**
     * Get cars.
     * 
     * This method get all cars from database.
     * 
     * @return List of all car.
     */
    getCars: async () => {
        return await DB.execute('SELECT * FROM `cars` ORDER BY `id`');
    },

    /**
     * Get car by ID.
     * 
     * This method retrieve all car data of ID.
     * 
     * @param {int} id Car ID.
     * 
     * @return Car data.
     */
    getCarById: async (id) => {
        const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `id` = ?', [id]);
        return (carQueryResults.length > 0) ? carQueryResults[0] : {};
    },

    /**
     * Get list of cars by user id
     * 
     * This method retrieve all cars belong to user id.
     * 
     * @param {int} userId
     * 
     * @return List of cars.
     */
    getCarsByUserId: async (userId) => {
        const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `user_id` = ? ORDER BY `id`', [userId]);
        return (carQueryResults.length > 0) ? carQueryResults : [];
    },

    /**
     * Get all available cars.
     * 
     * This method retrieve all available cars.
     * 
     * @return List of cars.
     */
    getAvailableCars: async () => {
        return await DB.execute('SELECT * FROM `cars` WHERE `status` = ? ORDER BY `id`', ['available']);
    },

     /**
     * Get all unavailable cars.
     * 
     * This method retrieve all unavailable cars.
     * 
     * @return List of cars.
     */
    getUnavailableCars: async () => {
        return await DB.execute('SELECT * FROM `cars` WHERE `status` = ? ORDER BY `id`', ['unavailable']);
    }

}