/**
 * CarNet JavaScript library for CarNet contract
 * 
 * @author Kelvin Yin
 */

const Web3            = require('web3');
const fs              = require('fs');
const TruffleContract = require('@truffle/contract');
const ethereumjsAbi   = require('ethereumjs-abi');
const truffleConfig   = require('../truffle-config');

module.exports = {
    web3Provider : null,
    contracts : {},
    ethereumServer: 'http://' + truffleConfig.networks.development.host + ':' + truffleConfig.networks.development.port,

    /**
     * Initialise CarNet contract
     * 
     * This method initialise web3 provider and and contract
     */
    init: function() {

        // Check if web3 has already been provided
        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider;
        } else {
            this.web3Provider = new Web3.providers.HttpProvider(this.ethereumServer);
        }

        // Create web3 object to connect to blockchain
        web3 = new Web3(this.web3Provider);

        // Get artifact from CarNet contract
        var carNetArtifact = JSON.parse(fs.readFileSync('blockchain/build/contracts/CarNet.json'));

        // Add contract
        this.contracts.CarNet = TruffleContract(carNetArtifact);
        this.contracts.CarNet.setProvider(this.web3Provider);

    },

    /**
     * Add car into blockchain.
     * 
     * @param {string} carHash    Unique hash code for car to be added.
     * @param {string} ethAccount The ethereum address of the car owner.
     * @param {string} privateKey Private key of the ethereum address.
     * 
     * @returns Contract transaction.
     */
    addCar: async function(carHash, ethAccount, privateKey) {
        
        // Deploy contract
        let instance = await this.contracts.CarNet.deployed();

        // Hash the message
        const hash = '0x' + ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [carHash, ethAccount]
        ).toString('hex');

        // Sign the hash message 
        const signedHash = web3.eth.accounts.sign(hash, privateKey);

        // Get the signature
        const signature = signedHash.signature;

        return await instance.addCar(
            web3.utils.fromAscii(carHash),
            signature, 
            { 
                from: ethAccount,
                gas: 3000000 
            }
        );

    },

    /**
     * Add rent car information into block chain
     * 
     * @param {string} carHash          Unique hash code for car
     * @param {string} ownerEthAccount  Ethereum address of the owner
     * @param {string} ethAccount       Ethereum address of the borrower
     * @param {string} privateKey       Private key of borrower ethereum address
     * 
     * @return Contract transaction.
     */
    rentCar: async function(carHash, ownerEthAccount, ethAccount, privateKey) {

        // Deploy contract
        let instance = await this.contracts.CarNet.deployed();

        // Hash the message
        const hash = "0x" + ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [carHash, ethAccount]
        ).toString('hex');

        // Sign the hash mesasge
        const signedHash = web3.eth.accounts.sign(hash, privateKey);

        // Get the signature
        const signature = signedHash.signature;

        return await instance.rentCar(
            web3.utils.fromAscii(carHash),
            ownerEthAccount,
            signature,
            {
                from: ethAccount,
                gas: 300000 
            }
        );
    },

    /**
     * Add return car information into blockchain
     * 
     * @param {string} carHash          Unique hash code for car
     * @param {string} ownerEthAccount  Ethereum address of car owner
     * @param {string} ethAccount       Ethereum address of car borrower
     */
    returnCar: async function(carHash, ownerEthAccount, ethAccount) {

        // Deploy contract
        let instance = await this.contracts.CarNet.deployed();
        return await instance.returnCar(
            web3.utils.fromAscii(carHash),
            ownerEthAccount,
            { 
                from: ethAccount,
                gas: 300000 
            }
        );
    },

    /**
     * Verify the account
     * 
     * @param {string} ethAccount Ethereum address of user
     * @param {string} privateKey Private key to the account
     * 
     * @return True if correct, false otherwise
     */
    verifyAccount: function(ethAccount, privateKey) {

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        if (account.address == ethAccount) {
            return true;
        } else {
            return false;
        }

    }
}