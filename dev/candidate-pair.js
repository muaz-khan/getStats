getStatsParser.candidatePair = function(result) {
    if (result.type !== 'googCandidatePair' && result.type !== 'candidate-pair' && result.type !== 'local-candidate' && result.type !== 'remote-candidate') return;

    // result.googActiveConnection means either STUN or TURN is used.

    if (result.googActiveConnection == 'true') {
        // id === 'Conn-audio-1-0'
        // localCandidateId, remoteCandidateId

        // bytesSent, bytesReceived

        Object.keys(getStatsResult.internal.candidates).forEach(function(cid) {
            var candidate = getStatsResult.internal.candidates[cid];
            if (candidate.ipAddress.indexOf(result.googLocalAddress) !== -1) {
                getStatsResult.connectionType.local.candidateType = candidate.candidateType;
                getStatsResult.connectionType.local.ipAddress = candidate.ipAddress;
                getStatsResult.connectionType.local.networkType = candidate.networkType;
                getStatsResult.connectionType.local.transport = candidate.transport;
            }
            if (candidate.ipAddress.indexOf(result.googRemoteAddress) !== -1) {
                getStatsResult.connectionType.remote.candidateType = candidate.candidateType;
                getStatsResult.connectionType.remote.ipAddress = candidate.ipAddress;
                getStatsResult.connectionType.remote.networkType = candidate.networkType;
                getStatsResult.connectionType.remote.transport = candidate.transport;
            }
        });

        getStatsResult.connectionType.transport = result.googTransportType;

        var localCandidate = getStatsResult.internal.candidates[result.localCandidateId];
        if (localCandidate) {
            if (localCandidate.ipAddress) {
                getStatsResult.connectionType.systemIpAddress = localCandidate.ipAddress;
            }
        }

        var remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
        if (remoteCandidate) {
            if (remoteCandidate.ipAddress) {
                getStatsResult.connectionType.systemIpAddress = remoteCandidate.ipAddress;
            }
        }
    }

    if (result.type === 'candidate-pair') {
        if (result.selected === true && result.nominated === true && result.state === 'succeeded') {
            // remoteCandidateId, localCandidateId, componentId
            var localCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
            var remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];

            // Firefox used above two pairs for connection
        }
    }

    if (result.type === 'local-candidate') {
        getStatsResult.connectionType.local.candidateType = result.candidateType;
        getStatsResult.connectionType.local.ipAddress = result.ipAddress;
        getStatsResult.connectionType.local.networkType = result.networkType;
        getStatsResult.connectionType.local.transport = result.mozLocalTransport || result.transport;
    }

    if (result.type === 'remote-candidate') {
        getStatsResult.connectionType.remote.candidateType = result.candidateType;
        getStatsResult.connectionType.remote.ipAddress = result.ipAddress;
        getStatsResult.connectionType.remote.networkType = result.networkType;
        getStatsResult.connectionType.remote.transport = result.mozRemoteTransport || result.transport;
    }
};
