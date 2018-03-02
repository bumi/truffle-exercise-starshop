var StarShopPremium = artifacts.require('./StarShopPremium.sol');

contract('StarShopPremium', async function(accounts) {

  it('should have an owner', function(done) {
    StarShopPremium.deployed().then(function(shop) {
      shop.owner().then(function(owner) {
        assert.equal(owner, accounts[0]);
        done();
      });
    });
  });

  it('should accept payments with the correct amount', async function() {
    var shop = await StarShopPremium.deployed();
    var amount = web3.toWei(0.1);
    web3.eth.sendTransaction({from: accounts[0], to: shop.address, value: amount});

    var balance = web3.eth.getBalance(shop.address);
    assert.equal(balance.toNumber(), amount);
  });

  it('transfers the balance to the owner', async function() {
    var shop = await StarShopPremium.deployed();

    var amount = web3.toWei(0.1);
    await web3.eth.sendTransaction({from: accounts[0], to: shop.address, value: amount});

    var ownerBalanceBefore = web3.eth.getBalance(accounts[0]);
    var result = await shop.cashout.sendTransaction();
    var shopBalance = web3.eth.getBalance(shop.address);
    assert.equal(shopBalance.toNumber(), 0);

    var ownerBalanceAfter = web3.eth.getBalance(accounts[0]);
    assert.isTrue(ownerBalanceAfter > ownerBalanceBefore); // just testing that it is more - as we are ignoring fees
  });

});
