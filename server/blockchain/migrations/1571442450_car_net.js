const CarNet = artifacts.require('CarNet');

module.exports = function(_deployer) {
  _deployer.deploy(CarNet);
};
