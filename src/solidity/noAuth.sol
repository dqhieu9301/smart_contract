/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.6;

contract noAuth {

    mapping (address =>uint) balances;

    function deposit() public payable{
 	    balances[msg.sender] = balances[msg.sender]+msg.value;	
    }
    
    function withdraw(uint amount) public payable {
      msg.sender.transfer(amount);
    }
    
    function kill() public {
        selfdestruct(msg.sender);
    }
}