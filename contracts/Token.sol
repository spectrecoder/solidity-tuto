// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Token contract to initializing ERC20 standard
contract Token {
    //Variable declaration (type, visibility, name)
    uint256 public totalSupply;

    //Contructor function -> automatically runs when the contract is deployed
    constructor() {
        //State variable accessible to the entire contract
        //writes to contract "STORAGE" which persist for the contracts lifecycle
        totalSupply = 1000000;
    }
    //Set total Number of tokens
    //Read total number of tokens
}
