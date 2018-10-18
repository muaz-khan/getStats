getStatsParser.bweforvideo = function(result) {
    if (result.type !== 'VideoBwe' && result.type !== "candidate-pair") return;
    getStatsResult.bandwidth.availableSendBandwidth = result.googAvailableSendBandwidth || result.availableOutgoingBitrate || 0;
    getStatsResult.bandwidth.googActualEncBitrate = result.googActualEncBitrate;
    getStatsResult.bandwidth.googAvailableSendBandwidth = result.googAvailableSendBandwidth || result.availableOutgoingBitrate || 0;
    getStatsResult.bandwidth.googAvailableReceiveBandwidth = result.googAvailableReceiveBandwidth || result.availableIncomingBitrate || 0;
    getStatsResult.bandwidth.googRetransmitBitrate = result.googRetransmitBitrate;
    getStatsResult.bandwidth.googTargetEncBitrate = result.googTargetEncBitrate;
    getStatsResult.bandwidth.googBucketDelay = result.googBucketDelay;
    // 实际传输的比特率
    getStatsResult.bandwidth.googTransmitBitrate = result.googTransmitBitrate || 0;
};
