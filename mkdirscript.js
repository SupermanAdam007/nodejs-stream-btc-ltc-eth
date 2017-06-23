timestampS = Math.round(new Date().getTime()/1000);
timestamp60S = Math.round(timestampS / 60);
timestamp10M = Math.round(timestamp60S / 1);
var fs = require('fs');
fs.mkdir('./data/' + timestamp10M);