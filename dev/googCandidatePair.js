getStatsParser.googCandidatePair = function(result) {
    if (result.type !== 'googCandidatePair') return;

    // result.googActiveConnection means either STUN or TURN is used.

    if (result.googActiveConnection == 'true') {
        // id === 'Conn-audio-1-0'
        // localCandidateId, remoteCandidateId

        // bytesSent, bytesReceived

        getStatsResult.connectionType.local.ipAddress = result.googLocalAddress;
        getStatsResult.connectionType.remote.ipAddress = result.googRemoteAddress;
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
};
