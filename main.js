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
  $.get("https://www.bitsofgold.co.il/api/btc")
    .then(function (data) {
        ilsPrice = JSON.parse(data);
    });
  // ilsPrice = {"buy": 1833.7596014713597, "sell": 1664.5540186445937 }
}

function refreshRates() {
  refreshIDR();
  refreshILS();
}

function fromIDR() {
  idrVal = parseInt($('#idr').val());
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
}
function fromBTC() {
  btcVal = parseFloat($('#btc').val());
  if (btcVal) {
    idrVal = btcVal * idrPrice;
    $('#idr').val(parseInt(idrVal));
    ilsVal = btcVal * getIlsRate();
    $('#ils').val(parseInt(ilsVal));
  }
  else {
    $('#idr').val("");
    $('#ils').val("");

  }
}

function fromILS() {
  ilsVal = parseInt($('#ils').val());
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
}

refreshRates();
setInterval(refreshRates, 60 * 1000);


$('#btc').keyup(fromBTC);

$('#idr').keyup(fromIDR);

$('#ils').keyup(fromILS);

$('#buying, #selling').change(fromILS);
