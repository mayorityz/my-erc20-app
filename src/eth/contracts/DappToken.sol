// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DappToken {
    string public name = "DApp Token";
    string public symbol = "DAPP";
    string public standard = "DApp Token v1.0";
    uint256 public totalSupply;
    address public sender = msg.sender;
    // add and understand decimals in solidity as well as math

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowed;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // transfer : sends tokens from the admin to another address
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(
            balanceOf[msg.sender] >= _value,
            "balance of sender insufficient"
        );

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // approve --- the msg.sender approves an amt of tokens to a spender.

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    // transferFrom : allows the "contract" to send tokens from an address to another address.
    // this is called a "delegated transfer" --- usually used by exchanges or contracts
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(
            _value <= balanceOf[_from],
            "insufficient balance left from sender account."
        );
        require(_value <= allowed[_from][_to], "insufficient assignment.");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowed[_from][_to] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    // returns the amount that _spender is able to withdraw from owner.
    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }
}
