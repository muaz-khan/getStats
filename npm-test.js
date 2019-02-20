// https://tonicdev.com/npm/getstats

var getStats;

try {
    getStats = require('getstats');
}
catch(e) {
    getStats = require('./getStats.js');
}

const fakeRtcPeerConnection = function() {};

getStats(fakeRtcPeerConnection, function(result) {
	console.log('result: ', result);
});

process.exit()
