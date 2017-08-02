getStatsParser.localcandidate = function(result) {
    if (result.type !== 'localcandidate') return;

    getStatsResult.internal.candidates[result.id] = {
        candidateType: result.candidateType,
        ipAddress: result.ipAddress /* + ':' + result.portNumber */ ,
        portNumber: result.portNumber,
        networkType: result.networkType,
        priority: result.priority,
        transport: result.transport,
        timestamp: result.timestamp,
        id: result.id,
        type: result.type
    };

    getStatsResult.connectionType.local.candidateType = result.candidateType;
    getStatsResult.connectionType.local.ipAddress = result.ipAddress + ':' + result.portNumber;
    getStatsResult.connectionType.local.networkType = getStatsResult.connectionType.local.networkType || result.networkType || systemNetworkType;
    getStatsResult.connectionType.local.transport = result.transport;
};
