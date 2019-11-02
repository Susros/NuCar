/**
 * Car Feature Data Access Object
 * 
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

module.exports = {

    /**
     * Get features of car.
     * 
     * @param {int} carId
     * 
     * @return List of features of car.
     */
    getCarFeatures: async (carId) => {
        return await DB.execute('SELECT * FROM `cars_features` WHERE `car_id` = ?', [carId]);
    },

    /**
     * Get cars by features
     * 
     * @param {int[]} features List of features
     * 
     * @return List of car Ids.
     */
    getCarByFeatures: async (features) => {
        return await DB.execute('SELECT `car_id` FROM `cars_features` WHERE `id` IN (?)', features);
    },

    /**
     * Add cars features.
     * 
     * @param {int}   carId
     * @param {int[]} features
     */
    addCarFeatures: async (carId, features) => {
        for(i in features) {
            await DB.execute('INSERT INTO `cars_features` (`car_id`, `feature_id`) VALUES (?, ?)', [carId, features[i]]);
        }
    }

}