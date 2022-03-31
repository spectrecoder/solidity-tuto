// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Token contract to initializing ERC20 standard
contract Token {
    //Token name
    string public name = "Penny Token";
    //Token symbol
    string public symbol = "PENT";
    //Token Standard
    string public standard = "Penny Token v1.0";
    //Variable declaration (type, visibility, name)
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    mapping(address => uint256) public balanceOf;

    //Contructor function -> automatically runs when the contract is deployed
    constructor(uint256 _initialSupply) {
        //Allocate initial token supply
        //Set total Number of tokens
        //Read total number of tokens
        balanceOf[msg.sender] = _initialSupply;
        //State variable accessible to the entire contract
        //writes to contract "STORAGE" which persist for the contracts lifecycle
        totalSupply = _initialSupply; //Underscore for local variables
    }

    //Transfer tokens (pay, send)
    //Trigger exception if transfer account doesn't have enough
    //Return a boolean value
    //Trigger event
    function transferToken(address _to, uint256 _value)
        public
        returns (bool success)
    {
        //Read balance to check if it is greater or equal to the transfer value
        require(balanceOf[msg.sender] >= _value);
        //Transfer balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
