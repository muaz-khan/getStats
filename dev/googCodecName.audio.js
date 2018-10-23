var AUDIO_codecs = ['opus', 'isac', 'ilbc'];

getStatsParser.checkAudioTracks = function(result) {
    if (!result.googCodecName || result.mediaType !== 'audio') return;

    if (AUDIO_codecs.indexOf(result.googCodecName.toLowerCase()) === -1) return;

    var sendrecvType = result.id.split('_').pop();
    // check sendrecvType
    if (sendrecvType != 'recv' && sendrecvType != 'send') {
        sendrecvType = result.isRemote ? 'recv' : 'send';
    }
    if (getStatsResult.audio[sendrecvType].codecs.indexOf(result.googCodecName) === -1) {
        getStatsResult.audio[sendrecvType].codecs.push(result.googCodecName);
    }

    if (result.bytesSent) {
        var bytes = 0;
        if (!!result.bytesSent) {
            if (!getStatsResult.internal.audio[sendrecvType].prevBytesSent) {
                getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
            }

            bytes = result.bytesSent - getStatsResult.internal.audio[sendrecvType].prevBytesSent;
            getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
        }
        getStatsResult.audio[sendrecvType].availableBandwidth = bytes * 8;
    }

    // 当参数合并后，根据 bytesReceived 来判断recv/send
    if (result.bytesReceived && result.bytesReceived !== '0') {
        if (!getStatsResult.internal.audio['recv'].prevBytesReceived) {
            getStatsResult.internal.audio['recv'].prevBytesReceived = result.bytesReceived;
        }

        var bytes = result.bytesReceived - getStatsResult.internal.audio['recv'].prevBytesReceived;
        getStatsResult.internal.audio['recv'].prevBytesReceived = result.bytesReceived;
        getStatsResult.audio['recv'].availableBandwidth = bytes * 8;
    }

    if (getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
    }
};
