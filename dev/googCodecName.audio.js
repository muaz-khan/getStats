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
        getStatsResult.audio[sendrecvType].availableBandwidth = bytes;
    }

    if (result.bytesReceived) {
        var bytes = 0;
        if (!!result.bytesReceived) {
            if (!getStatsResult.internal.audio[sendrecvType].prevBytesReceived) {
                getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
            }

            bytes = result.bytesReceived - getStatsResult.internal.audio[sendrecvType].prevBytesReceived;
            getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
        }
        getStatsResult.audio[sendrecvType].availableBandwidth = bytes;
    }

    if (getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
    }
};
