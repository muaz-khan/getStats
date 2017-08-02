getStatsParser.checkVideoBandwidth = function(result) {
    if (result.type !== 'VideoBwe') return;

    // id === 'bweforvideo'

    getStatsResult.video.bandwidth = {
        googActualEncBitrate: result.googActualEncBitrate,
        googAvailableSendBandwidth: result.googAvailableSendBandwidth,
        googAvailableReceiveBandwidth: result.googAvailableReceiveBandwidth,
        googRetransmitBitrate: result.googRetransmitBitrate,
        googTargetEncBitrate: result.googTargetEncBitrate,
        googBucketDelay: result.googBucketDelay,
        googTransmitBitrate: result.googTransmitBitrate
    };
};
