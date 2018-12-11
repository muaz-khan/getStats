var SSRC = {
    audio: {
        send: [],
        recv: []
    },
    video: {
        send: [],
        recv: []
    }
};

getStatsParser.ssrc = function(result) {
    if (!result.googCodecName || (result.mediaType !== 'video' && result.mediaType !== 'audio')) return;
    if (result.type !== 'ssrc') return;
    var sendrecvType = result.id.split('_').pop();
    // check sendrecvType
    if (sendrecvType != 'recv' && sendrecvType != 'send') {
        sendrecvType = result.isRemote ? 'recv' : 'send';
    }
    if (SSRC[result.mediaType][sendrecvType].indexOf(result.ssrc) === -1) {
        SSRC[result.mediaType][sendrecvType].push(result.ssrc)
    }
    // adapter for ios/web
    if (sendrecvType == 'recv') {
        creatVideoCounter(result, 'googNacksSent', 'recv');
        creatVideoCounter(result, 'googPlisSent', 'recv');
        creatVideoCounter(result, 'googFirsSent', 'recv');
        // rtt(currentRoundTripTime) 
    } else {
        creatVideoCounter(result, 'googNacksReceived', 'send');
        creatVideoCounter(result, 'googPlisReceived', 'send');
        creatVideoCounter(result, 'googFirsReceived', 'send');
        result.googRtt && (getStatsResult.video['send']['googRtt'] = result.googRtt);
    }

    getStatsResult[result.mediaType][sendrecvType].streams = SSRC[result.mediaType][sendrecvType].length;
};
