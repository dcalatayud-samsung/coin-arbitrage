import ext from "./utils/ext";
import storage from "./utils/storage";

var popup = document.getElementById("app");
storage.get('color', function(resp) {
  var color = resp.color;
  if(color) {
    popup.style.backgroundColor = color
  }
});

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})

var paintResult = () => {
    var prices,
        arbitrage;


    storage.get('selectedCoin', function(resp) {
        if (resp.selectedCoin) {  
          document.getElementById("coin-name").innerHTML = resp.selectedCoin.value;
        }
    });

    storage.get('price', function(resp) {
    if (resp.price) {
      var message = "Sell " + document.getElementById("coin-name").innerHTML + " on ";
      prices = resp.price;
      document.getElementById("bitfinex-price").innerHTML = prices.bitfinex;
      document.getElementById("binance-price").innerHTML = prices.binance;

      if (prices.binance > prices.bitfinex) {
        message +="<b>binance</b>";
        
      }
      else {
        message += "<b>bitfinex</b>";
      }
      document.getElementById("arbitrage-info").innerHTML = message;

    }
    else {
      prices = {
        bitfinex: 0,
        binance: 0
      };
      document.getElementById("bitfinex-price").innerHTML = prices.bitfinex;
      document.getElementById("binance-price").innerHTML = prices.binance;
      }
    });
    storage.get('arbitrage', function(resp) {
    if (resp.arbitrage) {
      arbitrage = resp.arbitrage;
      document.getElementById("result").innerHTML = arbitrage;
    }
    else {
      arbitrage = "...";
      document.getElementById("result").innerHTML = arbitrage;
      }
    });
}

paintResult();

document.getElementById("refreshButton").addEventListener("click", paintResult);