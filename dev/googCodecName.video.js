var VIDEO_codecs = ['vp9', 'vp8', 'h264'];

getStatsParser.checkVideoTracks = function(result) {
    if (!result.googCodecName || result.mediaType !== 'video') return;

    if (VIDEO_codecs.indexOf(result.googCodecName.toLowerCase()) === -1) return;

    // googCurrentDelayMs, googRenderDelayMs, googTargetDelayMs
    // transportId === 'Channel-audio-1'
    var sendrecvType = result.id.split('_').pop();
    // check sendrecvType
    if (sendrecvType != 'recv' && sendrecvType != 'send') {
        sendrecvType = result.isRemote ? 'recv' : 'send';
    }
    if (getStatsResult.video[sendrecvType].codecs.indexOf(result.googCodecName) === -1) {
        getStatsResult.video[sendrecvType].codecs.push(result.googCodecName);
    }

    if (!!result.bytesSent) {
        var bytes = 0;
        // 若刷新呀SDP重新交换，需要重新计算 Kb Mb Gb
        if (!getStatsResult.internal.video[sendrecvType].prevBytesSent || getStatsResult.internal.video[sendrecvType].prevBytesSent > result.bytesSent) {
            getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;
        }
        bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBytesSent;
        getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;
        getStatsResult.video[sendrecvType].availableBandwidth = bytes * 8;
    }

    // 当参数合并后，根据 bytesReceived 来判断recv/send Kb Mb Gb
    if (!!result.bytesReceived && result.bytesReceived !== '0') {
        var bytes = 0;
        if (!getStatsResult.internal.video['recv'].prevBytesReceived || getStatsResult.internal.video['recv'].prevBytesReceived > result.bytesReceived) {
            getStatsResult.internal.video['recv'].prevBytesReceived = result.bytesReceived;
        }
        bytes = result.bytesReceived - getStatsResult.internal.video['recv'].prevBytesReceived;
        getStatsResult.internal.video['recv'].prevBytesReceived = result.bytesReceived;
        getStatsResult.video['recv'].availableBandwidth = bytes * 8;
    }

    // 当参数合并后，根据 bytesReceived 来判断recv/send
    if (!!result.packetsLost) {
        if (!getStatsResult.internal.video['recv'].prevLostPacket) {
            getStatsResult.internal.video['recv'].prevLostPacket = result.packetsLost;
        }
        var bytes = getStatsResult.internal.video['recv'].prevBytesReceived;
        var packets = result.packetsLost - getStatsResult.internal.video['recv'].prevLostPacket;
        getStatsResult.video['recv'].packetsLostRate = bytes != 0 ? Math.round((packets / bytes) * 100) / 100 + "%" : '0.00%';
    }
    if (result.googFrameHeightReceived && result.googFrameWidthReceived) {
        getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthReceived;
        getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightReceived;
    }

    if (result.googFrameHeightSent && result.googFrameWidthSent) {
        getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthSent;
        getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightSent;
    }

    if (getStatsResult.video[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.video[sendrecvType].tracks.push(result.googTrackId);
    }
};
