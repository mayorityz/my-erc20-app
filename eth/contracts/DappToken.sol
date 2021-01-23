// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DappToken {
    string public name = "mancunians";
    string public symbol = "CITY";
    string public standard = "city token v1.0";
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // this contract follows the erc20 token.

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value); // check that the user has the value in theirwallet
        balanceOf[msg.sender] = _value;
        balanceOf[_to] += _value;

        // event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
