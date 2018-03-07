var StarShopPremium = artifacts.require('./StarShopPremium.sol');

contract('StarShopPremium', async function(accounts) {

  it('should have a price', function(done) {
    StarShopPremium.deployed().then(function(shop) {
      shop.price().then(function(price) {
        assert.equal(price.toString(), web3.toWei(0.1));
        done();
      });
    });
  });

  it('should have a price', async function() {
    var shop = await StarShopPremium.deployed();
    var price = await shop.price()

    assert.equal(price, web3.toWei(0.1));
  });

});
