/**
 * User Data Access Object.
 * 
 * This object access Users database.
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    /**
     * Get user by id.
     * 
     * This method retrieve user information by user id.
     * 
     * @param {int} id User id.
     * 
     * @return User information.
     */
    getUserById: async (id) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    /**
     * Get user by email
     * 
     * This method retrieve user information by user email.
     * 
     * @param {string} email Email account of user.
     * 
     * @return User information.
     */
    getUserByEmail: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `email` = ?', [email]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    /**
     * Check if email exists.
     * 
     * This method check if user email is already registered in the database.
     * 
     * @param {string} email Email account of user.
     * 
     * @return True if it exists, false otherwise.
     */
    emailExists: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * from `users` WHERE `email` = ?', [email]);
        return (userQueryResults.length > 0);
    },

    /**
     * Check if ethereum account already exists.
     * 
     * This method check if ethereum account already in database.
     * 
     * @param {string} ethAccount Ethereum account of user.
     * 
     * @return True if it exists, false otherwise.
     */
    ethAccountExists: async (ethAccount) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `eth_account` = ?', [ethAccount]);
        return (userQueryResults.length > 0);
    },

    /**
     * Add user into database.
     * 
     * This method accept all object with valid table fields then insert
     * the values into database.
     * 
     * @param {Object} userData
     * 
     * @return Promise.
     */
    addUser: async (userData) => {

        // Add default values
        userData.img       = '';
        userData.token     = '';
        userData.create_at = moment().format('YYYY-MM-DD');

        return await DB.execute(mysql.format('INSERT INTO `users` SET ? ', userData));

    },

    /**
     * Update user in database.
     * 
     * This method accept all object with valid table fields then upadte
     * the values in database.
     * 
     * @param {Object} userData 
     * @param {int}    id       User Id
     * 
     * @return Promise
     */
    updateUser: async (userData, id) => {
        return await DB.execute(mysql.format('UPDATE `users` SET ? WHERE `id` = ?', [userData, id]));
    }

}