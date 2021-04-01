// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DappToken.sol";

contract DappTokenSale {
    address payable admin;
    DappToken public tokenContract; // ie. dapptoken.sol
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    // initializes the admin address (deployer), contract, sales price.
    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "error 0");

        require(
            tokenContract.balanceOf(address(this)) >= _numberOfTokens,
            "insufficient tokens left!"
        );

        require(tokenContract.transfer(msg.sender, _numberOfTokens), "error 2");

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function justTransfer(uint256 _amount) public returns (uint256) {
        require(
            tokenContract.transfer(msg.sender, _amount),
            "transfer incomplete"
        );
        return _amount;
    }

    function checkDappTokenSender() public payable returns (address) {
        return tokenContract.sender();
    }

    // function endSale() public {
    //     require(msg.sender == admin);
    //     require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

    //     // UPDATE: Let's not destroy the contract here
    //     // Just transfer the balance to the admin
    //      admin.transfer(address(this).balance);
    // }
}
