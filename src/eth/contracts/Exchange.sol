// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
    1. set a deefault nwtwork ie main/rinkeby etc.
    2. set admin transfer.
    6. admin profit.
    7. transaction initiated
    8. AMT INTO THE CONTRACT MUST BE EQUAL TO MSG.VALUE
 */

contract Exchange {
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public upForSale;
    mapping(address => mapping(address => uint256)) public transaction;

    address public admin;

    event Sale(address indexed _from, uint256 indexed _amt);

    constructor() public {
        admin = msg.sender;
    }

    // only payable function
    function deposit(uint256 _amt) public payable returns (bool) {
        // use msg.value here for checks
        require(msg.value == _amt, "invalid amount!");
        balanceOf[msg.sender] += msg.value;
        return true;
    }

    // !we need to specify the rates of the seller, some how!
    function forSale(uint256 _amt) public payable returns (bool) {
        // use msg.value and msg.sender for mapping here too.

        // check that the person exists in the balanceOf mapping
        require(
            balanceOf[msg.sender] > 0,
            "You have not put any eth for sale yet!"
        );
        require(
            balanceOf[msg.sender] >= _amt,
            "You have an insufficient balance for sale"
        );

        balanceOf[msg.sender] -= _amt;
        upForSale[msg.sender] += _amt;

        // add an event here.
        // emit Sale(msg.sender, _amt);
        return true;
    }

    // mapping the amount you want to buy to a wallet
    // use msg.sender here instead.

    function buy(address _owner) public payable returns (bool) {
        // 2. You can't buy from a seller until initial transaction is concluded.
        // check this ...
        require(_owner != msg.sender, "You can't buy your own tokens!");

        require(
            upForSale[_owner] >= msg.value,
            "insufficient seller eth left!"
        );

        require(
            transaction[_owner][msg.sender] == 0,
            "you cannot buy from seller until initial transaction is completed!"
        );

        transaction[_owner][msg.sender] = msg.value;
        upForSale[_owner] -= msg.value;

        // remit event...
        return true;
    }

    // realise value. only by the seller
    function release(address _buyer) public returns (bool) {
        //check that there is such a pairing.
        require(transaction[msg.sender][_buyer] > 0, "pairing doesn't exist");
        balanceOf[_buyer] += transaction[msg.sender][_buyer];
        // or transfer directly to the buyer's account.
        /**
            address(this).transfer(_buyer, transaction[msg.sender][_buyer]);
         */
        transaction[msg.sender][_buyer] = 0;

        return true;
    }

    function resolveConflict(
        address _owner,
        address _buyer,
        bool status
    ) public returns (bool) {
        require(msg.sender == admin, "callable only by the admin");
        //true : resolve to _owner
        // false : resolve to _buyer
        if (status = true) {
            upForSale[_owner] += transaction[_owner][_buyer];
            transaction[_owner][_buyer] = 0;
        } else {
            balanceOf[_buyer] += transaction[_owner][_buyer];
            transaction[_owner][_buyer] = 0;
        }

        // !problem : what happens when a user is mapped to another several times?
        // solution : don't allow pairing if account already exists together.
    }

    // a view function that get the wallet balaance in the contract
    function myBalance(address _owner) public view returns (uint256, uint256) {
        return (balanceOf[_owner], upForSale[_owner]);
    }

    // fetch all the transactions

    /**
        other functions : transfer my eth out of the contract. via the balanceOf
     */

    // fix - contract's profit.
    // create a profit modifier - connect to the deployers account

    // withdraw to account. i.e transfer out from contract using address(this)

    // admin cancels a transaction btw two people.

    // use events where necessary...

    /**
        other functions
            - trade other erc20 tokens for money
            - trade other erc20 for eth, and vice versa.
     */
}
