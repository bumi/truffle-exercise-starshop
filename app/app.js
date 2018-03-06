function init() {
  console.log('loading contract data');
  console.log('network id', window.networkId);
  $.getJSON('/build/contracts/StarShopPremium.json?' + (new Date()).getTime(), function(data) {
    console.log('contract address: ', data.networks[window.networkId].address);
    window.shop = new web3js.eth.Contract(data.abi, data.networks[window.networkId].address);
    window.shop.methods.owner().call().then(function(ownerAddress) {
      $("#owner").html(ownerAddress);
      console.log('shop owner:', ownerAddress);
    });
    $('#account').val(window.account);
    updateStatus(window.account);

    window.shop.methods.price().call().then(function(price) {
      window.membershipPrice = price;
      $('#price').html(web3js.utils.fromWei(price));
      $('#join').click(buy);
    });
  });

  $('#check-status').click(function(event) {
    var account = $('#account').val();
    if(web3js.utils.isAddress(account)) {
      updateStatus(account);
    } else {
      $('#account_status').html('invalid address');
    }
    event.preventDefault();
  });
}

function buy() {
  var result = web3js.eth.sendTransaction({from: web3.eth.defaultAccount, to: window.shop.options.address, value: window.membershipPrice }).on('confirmation', function(confirmationNumber, receipt) {
    console.log('transaction confirmaton:', confirmationNumber);
    //if(confirmationNumber == 1) {
      updateStatus(window.account);
    //}
  });
}

function updateStatus(account) {
  console.log('checking status for: ', account);
  window.shop.methods.isPremium(account).call().then(function(isPremium) {
    if(isPremium) {
      $('#account_status').html('Thanks for being premium');
      $('#account_status').addClass('alert-success');
      $('#account_status').removeClass('alert-danger');
    } else {
      $('#account_status').html('sadly not a premium member, yet?!');
      $('#account_status').addClass('alert-danger');
      $('#account_status').removeClass('alert-success');
    }
  })
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    window.account = web3.eth.defaultAccount;
    if(window.account === undefined) {
      $('#login-notice').show();
      setInterval(function() {
        if(web3.eth.defaultAccount) {
          document.location.reload();
        }
      }, 500);
    } else {
      $('#login-notice').hide();
    }

    web3.version.getNetwork(function(err, version) {
      window.networkId = version;
      init();
    });
  } else {
    alert('no unlocked web3 provider found');
  }
});

