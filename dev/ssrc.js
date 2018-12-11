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

    if (sendrecvType == 'recv') {
        creatVideoCounter(result, 'googNacksSent', 'recv');
        creatVideoCounter(result, 'googPlisSent', 'recv');
        creatVideoCounter(result, 'googFirsSent', 'recv');
    } else {
        creatVideoCounter(result, 'googNacksReceived', 'send');
        creatVideoCounter(result, 'googPlisReceived', 'send');
        creatVideoCounter(result, 'googFirsReceived', 'send');
    }

    getStatsResult[result.mediaType][sendrecvType].streams = SSRC[result.mediaType][sendrecvType].length;
};
