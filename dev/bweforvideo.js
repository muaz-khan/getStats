getStatsParser.bweforvideo = function(result) {
    if (result.type !== 'VideoBwe' || result.type !== "candidate-pair") return;

    getStatsResult.bandwidth.availableSendBandwidth = result.googAvailableSendBandwidth || result.availableOutgoingBitrate;

    getStatsResult.bandwidth.googActualEncBitrate = result.googActualEncBitrate;
    getStatsResult.bandwidth.googAvailableSendBandwidth = result.googAvailableSendBandwidth || result.availableOutgoingBitrate;
    getStatsResult.bandwidth.googAvailableReceiveBandwidth = result.googAvailableReceiveBandwidth || result.availableIncomingBitrate;
    getStatsResult.bandwidth.googRetransmitBitrate = result.googRetransmitBitrate;
    getStatsResult.bandwidth.googTargetEncBitrate = result.googTargetEncBitrate;
    getStatsResult.bandwidth.googBucketDelay = result.googBucketDelay;
    getStatsResult.bandwidth.googTransmitBitrate = result.googTransmitBitrate;
};
