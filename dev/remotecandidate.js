getStatsParser.remotecandidate = function(result) {
    if (result.type !== 'remotecandidate') return;

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

    getStatsResult.connectionType.remote.candidateType = result.candidateType;
    getStatsResult.connectionType.remote.ipAddress = result.ipAddress + ':' + result.portNumber;
    getStatsResult.connectionType.remote.networkType = getStatsResult.connectionType.remote.networkType || result.networkType || systemNetworkType;
    getStatsResult.connectionType.remote.transport = result.transport;
};
