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
            if (localCandidate.networkType) {
                getStatsResult.connectionType.local.networkType = localCandidate.networkType;
            }

            if (localCandidate.transport) {
                getStatsResult.connectionType.local.transport = localCandidate.transport;
            }

            if (localCandidate.ipAddress) {
                getStatsResult.connectionType.systemIpAddress = localCandidate.ipAddress;
            }
        }

        var remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
        if (remoteCandidate) {
            if (remoteCandidate.networkType) {
                getStatsResult.connectionType.remote.networkType = remoteCandidate.networkType;
            }

            if (remoteCandidate.transport) {
                getStatsResult.connectionType.remote.transport = remoteCandidate.transport;
            }

            if (remoteCandidate.ipAddress) {
                getStatsResult.connectionType.systemIpAddress = remoteCandidate.ipAddress;
            }
        }
    }
};
