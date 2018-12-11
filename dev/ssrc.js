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
    creatVideoCounter(result, 'googNacksSent', 'send');
    creatVideoCounter(result, 'googPlisSent', 'send');
    creatVideoCounter(result, 'googFirsSent', 'send');
    creatVideoCounter(result, 'googNacksReceived', 'recv');
    creatVideoCounter(result, 'googPlisReceived', 'recv');
    creatVideoCounter(result, 'googFirsReceived', 'recv');
    getStatsResult[result.mediaType][sendrecvType].streams = SSRC[result.mediaType][sendrecvType].length;
};
