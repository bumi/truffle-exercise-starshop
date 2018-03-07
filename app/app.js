function init() {
  console.log('loading contract data');
  console.log('network id', window.networkId);
  // we simply use a getJSON call to load the contract data. (the date get parameter is to prevent client side caching)
  $.getJSON('/build/contracts/StarShopPremium.json?' + (new Date()).getTime(), function(data) {
    console.log('contract address: ', data.networks[window.networkId].address);
    console.log('contract abi: ', data.abi);

    // TODO: initialize a new web3js.eth.Contract instance for our contract
    //
    // TODO: load the owner address and write it to the #owner DOM element
    //
    // TODO: load the price and write it to the #price DOM element - formatted as Ether)
    //

    // prefilling the #account input with the current user account
    $('#account').val(window.account);
    // checking the status of the current user account
    updateStatus(window.account);
  });


  // event listener on the #check-status button
  // checks if the address is valid and calls the updateStatus function
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

// TODO: implement the buy function that makes a payment to the contract
// checkout web3js.eth.sendTransaction
function buy() {
}

// TODO: implement the update status function that check the membership status of a given account
// write the result to #account-status
function updateStatus(account) {

}


window.addEventListener('load', function() {
  // checking if a web3 object is injected (e.g. from metamask or parity)
  if (typeof web3 !== 'undefined') {
    // initialize our own web3js object with the latest and greatest web3.js version
    // ATTENTION: naming: web3js vs. web3
    window.web3js = new Web3(web3.currentProvider);

    // load the default account and check if the account is unlocked
    window.account = web3.eth.defaultAccount;
    if(window.account === undefined) {
      $('#login-notice').show();
      // account is locked so we wait for the user to unlock and then reload the page
      setInterval(function() {
        if(web3.eth.defaultAccount) {
          document.location.reload();
        }
      }, 500);
    } else {
      $('#login-notice').hide();
    }

    web3.version.getNetwork(function(err, version) {
      // check what network we are on and run the init function
      window.networkId = version;
      init();
    });
  } else {
    alert('no unlocked web3 provider found');
  }
});

