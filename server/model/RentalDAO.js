/**
 * Rental Data Access Object.
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    /**
     * Add rental data.
     * 
     * This method handle inserting rental data into
     * database.
     * 
     * @param {Object} rentalData
     * 
     * @return Promise.
     */
    addRental: async (rentalData) => {
        // Add created date
        rentalData.created_at  = moment().format("YYYY-MM-DD");
        rentalData.returned_at = null;

        return await DB.execute(mysql.format('INSERT INTO `rentals` SET ?', rentalData));
    },

    /**
     * Update rental data.
     * 
     * This method handle updating rental data in
     * the database.
     * 
     * @param {Object} rentalData
     * @param {int}    id         Rental ID.
     * 
     * @return Promise.
     */
    updateRental: async (rentalData, id) => {
        return await DB.execute(mysql.format('UPDATE `rentals` SET ? WHERE `id` = ?', [rentalData, id]));
    },

    /**
     * Get all user's rentals.
     * 
     * This method retrieve all rentals belong to user.
     * 
     * @param {int} userId
     * 
     * @return List of rentals
     */
    getRentals: async (userId) => {
        const [rentalQueryResults, rentalQueryFields] = await DB.execute('SELECT * FROM `rentals` WHERE `user_id` = ?', [userId]);
        return (rentalQueryResults.length > 0) ? rentalQueryResults : []
    },

    /**
     * Get rental by id.
     * 
     * This method retrieve rental information by id.
     * 
     * @param {int} id
     * 
     * @return Rental information
     */
    getRentalById: async (id) => {
        const [rentalQueryResults, rentalQueryFields] = await DB.execute('SELECT * FROM `rentals` WHERE `id` = ?', [id]);
        return (rentalQueryResults.length > 0) ? rentalQueryResults[0] : {}
    },
    
    /**
     * Get all user's returned rentals.
     * 
     * This method retrieve all rentals that have already been
     * returned.
     * 
     * @param {int} userId
     * 
     * @return List of retals.
     */
    getReturnedRetals: async (userId) => {
        const [rentalQueryResults, rentalQueryFields] = await DB.execute('SELECT * FROM `rentals` WHERE `user_id` = ? AND `returned_at` IS NOT NULL', [userId]);
        return (rentalQueryResults.length > 0) ? rentalQueryResults : [];
    },

    /**
     * Get all user's non-returned rentals.
     * 
     * This method retrieve all rentals that are currently
     * not returned yet.
     * 
     * @param {int} userId
     * 
     * @return List of retals.
     */
    getCurrentRentals: async (userId) => {
        const [rentalQueryResults, rentalQueryFields] = await DB.execute('SELECT * FROM `rentals` WHERE `user_id` = ? AND `returned_at` IS NULL', [userId]);
        return (rentalQueryResults.length > 0) ? rentalQueryResults : [];
    }

}