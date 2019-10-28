/**
 * Features Data Access Object
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

module.exports = {

    /**
     * Get all features from database.
     * 
     * @return List of all features.
     */
    getFeatures: async () => {
        return await DB.execute('SELECT * FROM `features`');
    },

    /**
     * Get feature by ID.
     * 
     * @param {int} id
     * 
     * @return Feature.
     */
    getFeatureById: async (id) => {
        const [r, e] = await DB.execute('SELECT * FROM `features` WHERE `id` = ?', [id]);
        return (r.length > 0) ? r[0] : {};
    },

    /**
     * Check if feature exist in database.
     * 
     * @param {int} id
     * 
     * @return True if it does, false otherwise.
     */
    featureExists: async (id) => {
        const [r, e] = await DB.execute('SELECT * FROM `features` WHERE `id` = ?', [id]);
        return (r.length > 0);
    }

}