var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");
var Exchange = artifacts.require("./Exchange.sol");

// module.exports = function (deployer) {
//   deployer.deploy(DappToken, 1000000).then(function () {
//     // Token price is 0.001 Ether
//     var tokenPrice = 1000000000000000;
//     /**
//      * we have to assign 75% of this tokens to the contract.
//      */
//     return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
//   });
// };

module.exports = function (deployer) {
  deployer.deploy(Exchange);
};
