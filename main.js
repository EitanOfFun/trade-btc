var idrPrice;
var ilsPrice;


function getIlsRate() {
  if (isBuying())
    return ilsPrice.buy;
  return ilsPrice.sell;
}
function isBuying() {
  return document.getElementById("buying").checked;
}


function refreshIDR() {
  $lastPrice = $('#lastPrice');
  $lastPrice.html("");
  $.get("https://vip.bitcoin.co.id/api/btc_idr/ticker")
    .then(function (data) {
      idrPrice = JSON.parse(data).ticker.last - 100000
      // $lastPrice.html(lastPrice);
      // app.ports.lastPrice.send("" + lastPrice);
      // app.ports.lastPrice.send("" + data);
  });
}

function refreshILS() {
  // $.get("https://www.bitsofgold.co.il/api/btc")
  //   .then(function (data) {
  //       ilsPrice = JSON.parse(data);
  //   });
  ilsPrice = {"buy": 1833.7596014713597, "sell": 1664.5540186445937 }
}

function refreshRates() {
  refreshIDR();
  refreshILS();
}

refreshRates();
setInterval(refreshRates, 60 * 1000);


$('#btc').keyup(function() {
    btcVal = parseFloat($(this).val());
    if (btcVal) {
      idrVal = btcVal * idrPrice;
      $('#idr').val(parseInt(idrVal));
      ilsVal = btcVal * ((ilsPrice.buy + ilsPrice.sell) / 2);
      $('#ils').val(parseInt(ilsVal));
    }
    else {
      $('#idr').val("");
      $('#ils').val("");

    }
});

$('#idr').keyup(function() {
    idrVal = parseInt($(this).val());
    if (idrVal) {
      btcVal = idrVal / idrPrice;
      $('#btc').val(btcVal.toFixed(8));
      ilsVal = btcVal * getIlsRate();
      $('#ils').val(parseInt(ilsVal));
    }
    else {
      $('#btc').val("")
      $('#ils').val("")
    }
});

$('#ils').keyup(function() {
    ilsVal = parseInt($(this).val());
    if (ilsVal) {
      btcVal = ilsVal / getIlsRate();
      $('#btc').val(btcVal.toFixed(8));
      idrVal = btcVal * idrPrice;
      $('#idr').val(parseInt(idrVal));
    }
    else {
      $('#btc').val("");
      $('#idr').val("");
    }
});
