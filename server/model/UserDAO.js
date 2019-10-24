/**
 * User Data Access Object.
 * 
 * This object access Users database.
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

const mysql        = require('mysql2');
const moment       = require('moment');

var UserDAO = module.exports = {

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
     * Check if user already exists.
     * 
     * This method checks if either email or ethereum account exists
     * in the databse.
     * 
     * @param {string} email      Email account of user.
     * @param {string} ethAccount Ethereum account address of user
     * 
     * @return True if it exists, false otherwise.
     */
    userExists: async (email, ethAccount) => {
       
        // Set ethereum account variable to empty string if not present
        ethAccount = ethAccount || "";

        // Values to be executed
        let sqlValues = [email];

        // SQL to query
        let sql = 'SELECT * FROM `users` WHERE `email` = ?';

        if (ethAccount != "") {
            sql += " OR `eth_account` = ?";
            sqlValues.push(ethAccount);
        }

        // Get query
        const [userQueryResults, userQueryFields] = await DB.execute(sql, sq.sqlValues);

        return userQueryResults.length > 0;

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

    }

}