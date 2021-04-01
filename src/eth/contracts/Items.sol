// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Items{
    // store item, name, price, desc.
    struct Item{
        string name; 
        uint price; 
        string desc; 
        address saler;
        bool status;
    }

    mapping (uint => Item) public items;

    uint id;
    Item product;

    function saveNewItem (string memory _name, uint _price, string memory _desc) public returns(bool){
        product = Item(_name, _price, _desc, msg.sender, true);
        id++;
        items[id] = product;
        return true;
    }

    function getItemById(uint _id) public view returns(string memory){
        return items[_id].name;
    }
}