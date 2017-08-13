var REMOTE_candidateType = [];
var REMOTE_transport = [];
var REMOTE_ipAddress = [];
var REMOTE_networkType = [];

getStatsParser.remotecandidate = function(result) {
    if (result.type !== 'remotecandidate') return;

    if (result.candidateType && REMOTE_candidateType.indexOf(result.candidateType) === -1) {
        REMOTE_candidateType.push(result.candidateType);
    }

    if (result.transport && REMOTE_transport.indexOf(result.transport) === -1) {
        REMOTE_transport.push(result.transport);
    }

    if (result.ipAddress && REMOTE_ipAddress.indexOf(result.ipAddress + ':' + result.portNumber) === -1) {
        REMOTE_ipAddress.push(result.ipAddress + ':' + result.portNumber);
    }

    if (result.networkType && REMOTE_networkType.indexOf(result.networkType) === -1) {
        REMOTE_networkType.push(result.networkType);
    }

    getStatsResult.internal.candidates[result.id] = {
        candidateType: REMOTE_candidateType,
        ipAddress: REMOTE_ipAddress,
        portNumber: result.portNumber,
        networkType: REMOTE_networkType,
        priority: result.priority,
        transport: REMOTE_transport,
        timestamp: result.timestamp,
        id: result.id,
        type: result.type
    };

    getStatsResult.connectionType.remote.candidateType = REMOTE_candidateType;
    getStatsResult.connectionType.remote.ipAddress = REMOTE_ipAddress;
    getStatsResult.connectionType.remote.networkType = REMOTE_networkType;
    getStatsResult.connectionType.remote.transport = REMOTE_transport;
};
