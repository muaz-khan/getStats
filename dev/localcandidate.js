var LOCAL_candidateType = [];
var LOCAL_transport = [];
var LOCAL_ipAddress = [];
var LOCAL_networkType = [];

getStatsParser.localcandidate = function(result) {
    if (result.type !== 'localcandidate') return;

    if (result.candidateType && LOCAL_candidateType.indexOf(result.candidateType) === -1) {
        LOCAL_candidateType.push(result.candidateType);
    }

    if (result.transport && LOCAL_transport.indexOf(result.transport) === -1) {
        LOCAL_transport.push(result.transport);
    }

    if (result.ipAddress && LOCAL_ipAddress.indexOf(result.ipAddress + ':' + result.portNumber) === -1) {
        LOCAL_ipAddress.push(result.ipAddress + ':' + result.portNumber);
    }

    if (result.networkType && LOCAL_networkType.indexOf(result.networkType) === -1) {
        LOCAL_networkType.push(result.networkType);
    }

    getStatsResult.internal.candidates[result.id] = {
        candidateType: LOCAL_candidateType,
        ipAddress: LOCAL_ipAddress,
        portNumber: result.portNumber,
        networkType: LOCAL_networkType,
        priority: result.priority,
        transport: LOCAL_transport,
        timestamp: result.timestamp,
        id: result.id,
        type: result.type
    };

    getStatsResult.connectionType.local.candidateType = LOCAL_candidateType;
    getStatsResult.connectionType.local.ipAddress = LOCAL_ipAddress;
    getStatsResult.connectionType.local.networkType = LOCAL_networkType;
    getStatsResult.connectionType.local.transport = LOCAL_transport;
};
