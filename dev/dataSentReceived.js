getStatsParser.dataSentReceived = function(result) {
    var mediaType = result.googCodecName !== 'opus' ? 'video' : 'audio';
    if (!!result.bytesSent) {
        getStatsResult[mediaType].bytesSent += parseInt(result.bytesSent);
    }

    if (!!result.bytesReceived) {
        getStatsResult[mediaType].bytesReceived += parseInt(result.bytesReceived);
    }
};
