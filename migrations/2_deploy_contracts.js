const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(Token, 1000000);
};
