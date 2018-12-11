getStatsParser.candidatePair = function(result) {
    if (result.type !== 'googCandidatePair' && result.type !== 'candidate-pair') return;

    // result.googActiveConnection means either STUN or TURN is used.

    if (result.googActiveConnection == 'true') {
        // id === 'Conn-audio-1-0'
        // localCandidateId, remoteCandidateId

        // 实际传输的比特率 bytesSent, bytesReceived - 标准的getStats不支持VideoBwe Kb Mb Gb
        if (result.bytesSent) {
            if (!getStatsResult.internal.preCandidateBytesSent) {
                getStatsResult.internal.preCandidateBytesSent = result.bytesSent;
            }
            var bytes = result.bytesSent - getStatsResult.internal.preCandidateBytesSent;
            getStatsResult.internal.preCandidateBytesSent = result.bytesSent;
            getStatsResult.bandwidth.candidateTransmitBitrate = bytes * 8;
        }
        if (result.bytesReceived) {
            if (!getStatsResult.internal.preCandidateBytesReceived) {
                getStatsResult.internal.preCandidateBytesReceived = result.bytesReceived;
            }
            var bytes = result.bytesReceived - getStatsResult.internal.preCandidateBytesReceived;
            getStatsResult.internal.preCandidateBytesReceived = result.bytesReceived;
            getStatsResult.bandwidth.candidateBytesReceived = bytes * 8;
        }
        // rtt(currentRoundTripTime) adapter for android
        result.currentRoundTripTime && (getStatsResult.video['recv']['googRtt'] = result.currentRoundTripTime);

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

    if (result.type === 'transport' || result.type === 'googComponent') {
        if (!!result.selectedCandidatePairId || result.nominated === true && result.state === 'succeeded') {
            // remoteCandidateId, localCandidateId, componentId
            var localCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
            var remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];

            // Firefox used above two pairs for connection
        }
    }
};
