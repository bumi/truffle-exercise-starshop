pragma solidity ^0.4.19;

contract owned {
    address public owner;
    function owned() public { owner = msg.sender; }
    modifier ownerOnly() {
      require(msg.sender == owner);
    	_;
    }
}
