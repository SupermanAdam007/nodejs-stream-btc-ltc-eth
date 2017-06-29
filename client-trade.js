var socket = require('socket.io-client')('https://streamer.cryptocompare.com/');
var fs = require('fs');
var dateFormat = require('dateformat');

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

function repairCurrent(m){
	return [dateFormat(new Date(parseInt(m[6])*1000), 'yyyy-mm-dd hh:mm:ss'), m[5]].join(';');
}

function repairTrade(m){
	return [dateFormat(new Date(parseInt(m[6])*1000), 'yyyy-mm-dd hh:mm:ss'), m[4], m[9]].join(';');
}

function determineSubscription(message, item, index){
	if (message.indexOf(item) != -1) {
		splitedLine = message.split('~');
		messageRes = '';
		if (splitedLine[0] == 0) {
			messageRes = repairTrade(splitedLine);
		} else if (splitedLine[0] == 2) {
			messageRes = repairCurrent(splitedLine);
		}
    	fs.appendFile('./data/'+ date_dir_name + '/' + item + '.dat', messageRes + '\n', function(err) {
    	if(err) {
        	return console.error(err);
    	}
	});
	}
}

//socket.emit('SubRemove', {subs:subscription} );
socket.emit('SubAdd', {subs:subscription} );

socket.on("m", function(message){
	var messageType = message.substring(0, message.indexOf("~"));
	var res = {};
	console.log(message);
	
	subscription.forEach(function(item, index){
			date_dir_name = Math.round(new Date().getTime()/(1000*60)); //date_dir_name = Math.round(new Date().getTime()/(1000*60*10));
			fs.mkdir('./data/' + date_dir_name, (err, data) => {
	  			if (err) {
    	  			return;
    			}
			});
			fs.appendFile('./data/'+ date_dir_name + '/' + item + '.dat', '', function(err) {
    		if(err) {
        		return console.error(err);
    		}
			});
		});
	subscription.forEach(function(item, index){
			determineSubscription(message, item, index)
		});
}); 
