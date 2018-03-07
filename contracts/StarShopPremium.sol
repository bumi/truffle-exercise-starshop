pragma solidity ^0.4.19;

import './owned.sol';
/**
 * This contract does this and that...
 */
contract StarShopPremium is owned{
  uint public priceDiscount; // 5 = 5%
  uint public loyaltyBoost;  // 5 = 5%
 
  uint256 public price;
  mapping (address  => uint ) payments;
  
  function StarShopPremium() public {
    priceDiscount = 5;
    loyaltyBoost = 5;
    price = 100 finney; 
  }

  function () public payable {
    require(msg.value == price);
    payments[msg.sender] = now;
  }

  function cashout() public ownerOnly {
    owner.transfer(this.balance);
  }

  function isPremium(address addr) public view returns (bool result){
    return (payments[addr] > now - 1 years); 
  }
}
