getStatsParser.checkAudioTracks = function(result) {
    if (result.googCodecName !== 'opus') return;

    var sendrecvType = result.id.split('_').pop();

    if (result.bytesSent) {
        var kilobytes = 0;
        if (!!result.bytesSent) {
            if (!getStatsResult.internal.audio[sendrecvType].prevBytesSent) {
                getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
            }

            var bytes = result.bytesSent - getStatsResult.internal.audio[sendrecvType].prevBytesSent;
            getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;

            kilobytes = bytes / 1024;
        }

        getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
    }

    if (result.bytesReceived) {
        var kilobytes = 0;
        if (!!result.bytesReceived) {
            if (!getStatsResult.internal.audio[sendrecvType].prevBytesReceived) {
                getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
            }

            var bytes = result.bytesReceived - getStatsResult.internal.audio[sendrecvType].prevBytesReceived;
            getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;

            kilobytes = bytes / 1024;
        }

        getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
    }

    if (getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
    }
};
