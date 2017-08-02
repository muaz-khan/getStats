getStatsParser.checkDataChannel = function(result) {
    if (result.datachannelid && v.type === 'datachannel') {
        getStatsResult.datachannel = {
            state: result.state // open or connecting
        }
    }
};
