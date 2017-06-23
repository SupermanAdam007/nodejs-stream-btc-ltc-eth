var socket = require('socket.io-client')('https://streamer.cryptocompare.com/');
var fs = require('fs');

//Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
//Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
//For aggregate quote updates use CCCAGG as market
var subscription = ['0~Poloniex~BTC~USD', 
					'0~Poloniex~ETH~USD', 
					'0~Poloniex~ETH~BTC', 
					'0~Poloniex~LTC~USD',
					'0~Poloniex~LTC~BTC',
					'2~Poloniex~BTC~USD',
					'2~Poloniex~ETH~USD',
					'2~Poloniex~ETH~BTC',
					'2~Poloniex~LTC~USD',
					'2~Poloniex~LTC~BTC'];

socket.emit('SubAdd', {subs:subscription} );

socket.on("m", function(message){
	var messageType = message.substring(0, message.indexOf("~"));
	var res = {};
	console.log(message);
	/*if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
		res = CCC.CURRENT.unpack(message);
		console.log(res);
		//updateQuote(res);
	}*/						
	fs.appendFile("./test", message + '\n', function(err) {
    if(err) {
        return console.log(err);
    }
	}); 
});
