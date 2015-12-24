var lastPrice;

function refreshLastPrice() {
  $lastPrice = $('#lastPrice');
  $lastPrice.html("");
  $.get("https://vip.bitcoin.co.id/api/btc_idr/ticker")
    .then(function (data) {
      lastPrice = JSON.parse(data).ticker.last - 100000
      $lastPrice.html(lastPrice);
  });
}

refreshLastPrice();

$('#btc').keyup(function() {
    btcVal = parseFloat($(this).val());
    if (btcVal) {
      idrVal = btcVal * lastPrice
      $('#idr').val(parseInt(idrVal));
    }
    else {
      $('#idr').val("")
    }
});

$('#idr').keyup(function() {
    idrVal = parseInt($(this).val());
    if (idrVal) {
      btcVal = idrVal / lastPrice;
      $('#btc').val(btcVal.toFixed(8));
    }
    else {
      $('#btc').val("")
    }
});
