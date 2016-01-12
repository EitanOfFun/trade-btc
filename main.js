var idrPrice;
var ilsPrice;
var usdPrice;


function getIlsRate() {
  if (isBuying())
    return ilsPrice.buy;
  return ilsPrice.sell;
}
function isBuying() {
  return document.getElementById("buying").checked;
}


function refreshBTC_IDR() {
  $lastPrice = $('#lastPrice');
  $lastPrice.html("");
  $.get("https://vip.bitcoin.co.id/api/btc_idr/ticker")
    .then(function (data) {
      idrPrice = JSON.parse(data).ticker.last - 100000;
      // $lastPrice.html(lastPrice);
      // app.ports.lastPrice.send("" + lastPrice);
      // app.ports.lastPrice.send("" + data);
  });
}

function refreshBTC_ILS() {
  $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.bitsofgold.co.il%2Fapi%2Fbtc'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
  .then(function (data) {
    ilsPrice = JSON.parse(data.query.results.body);
  });
}
function refreshUSD_ILS() {
  $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDILS%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
  .then(function (data) {
    usdPrice = data.query.results.rate.Rate;
  });
}
function callb(json) {
  console.log(json);
}
function refreshRates() {
  $("#btc").val("");
  $("#ils").val("");
  $("#idr").val("");
  $("#usd").val("");
  refreshBTC_IDR();
  refreshBTC_ILS();
  refreshUSD_ILS();
}

function fromIDR() {
  idrVal = parseInt($('#idr').val());
  if (idrVal) {
    btcVal = idrVal / idrPrice;
    $('#btc').val(btcVal.toFixed(8));
    ilsVal = btcVal * getIlsRate();
    $('#ils').val(parseInt(ilsVal));
    usdVal = ilsVal / usdPrice;
    $('#usd').val(usdVal.toFixed(2));
  }
  else {
    $('#btc').val("");
    $('#ils').val("");
    $('#usd').val("");
  }
}
function fromBTC() {
  btcVal = parseFloat($('#btc').val());
  if (btcVal) {
    idrVal = btcVal * idrPrice;
    $('#idr').val(parseInt(idrVal));
    ilsVal = btcVal * getIlsRate();
    $('#ils').val(parseInt(ilsVal));
    usdVal = ilsVal / usdPrice;
    $('#usd').val(usdVal.toFixed(2));
  }
  else {
    $('#idr').val("");
    $('#ils').val("");
    $('#usd').val("");
  }
}

function fromILS() {
  ilsVal = parseInt($('#ils').val());
  if (ilsVal) {
    btcVal = ilsVal / getIlsRate();
    $('#btc').val(btcVal.toFixed(8));
    idrVal = btcVal * idrPrice;
    $('#idr').val(parseInt(idrVal));
    usdVal = ilsVal / usdPrice;
    $('#usd').val(usdVal.toFixed(2));
  }
  else {
    $('#btc').val("");
    $('#idr').val("");
    $('#usd').val("");
  }
}

function fromUSD() {
  usdVal = parseFloat($('#usd').val());
  if (usdVal) {
    ilsVal = usdVal * usdPrice;
    $('#ils').val(parseInt(ilsVal));
    btcVal = ilsVal / getIlsRate();
    $('#btc').val(btcVal.toFixed(8));
    idrVal = btcVal * idrPrice;
    $('#idr').val(parseInt(idrVal));
  }
  else {
    $('#btc').val("");
    $('#idr').val("");
    $('#ils').val("");
  }
}

refreshRates();
// setInterval(refreshRates, 60 * 1000);


$('#btc').keyup(fromBTC);

$('#idr').keyup(fromIDR);

$('#ils').keyup(fromILS);

$('#usd').keyup(fromUSD);

$('#buying, #selling').change(fromILS);
