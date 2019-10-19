const ECDSA = artifacts.require('ECDSA');

module.exports = function(_deployer) {
  _deployer.deploy(ECDSA);
};
