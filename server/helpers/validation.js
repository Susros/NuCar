/**
 * Validation helpers function
 *
 * @author Kelvin Yin
 * @since 1.0.0
 * @version 1.0.0
 */

module.exports = {

    /**
     * Email validation.
     * 
     * This method validate email address.
     * 
     * @param {string} email
     * 
     * @return True if it is valid, false otherwise.
     */
    isEmailValid: email => {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    },

    /**
     * Password validation.
     * 
     * This method validate if password.
     * 
     * @param {string} password
     * 
     * @return True if it is invalid, false otherwise.
     */
    isPasswordValid: password => {
        return (password.length > 8);
    },

    /**
     * User type validation.
     * 
     * This method validate the type of user.
     * Tyeps of user are owner and borrower.
     * 
     * @param {string} userType
     * 
     * @return True if it is valid, false otherwise.
     */
    isUserTypeValid: userType => {
        return (userType == 'owner' || userType == 'borrower');
    },

    /**
     * Ethereum account validation.
     * 
     * This method validate if ethereum account address is valid.
     * 
     * @param {string} ethAccount
     */
    isEthAccountValid: ethAccount => {
        return (ethAccount.length == 42);
    },

    /**
     * Ethereum private key validation.
     * 
     * This method validate ethereum private key.
     * 
     * @param {string} ethPrivateKey
     * 
     * @return True if it is valid, false otherwise.
     */
    isEthPrivateKeyValid: ethPrivateKey => {
        return (ethPrivateKey.length == 66);
    }

}
