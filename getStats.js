'use strict';

// Last time updated: 2017-08-11 1:21:20 PM UTC

// _______________
// getStats v1.0.4

// Open-Sourced: https://github.com/muaz-khan/getStats

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

window.getStats = function(mediaStreamTrack, callback, interval) {

    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    if (typeof MediaStreamTrack === 'undefined') {
        MediaStreamTrack = {}; // todo?
    }

    var systemNetworkType = ((navigator.connection || {}).type || 'unknown').toString().toLowerCase();

    var getStatsResult = {
        audio: {
            send: {
                tracks: []
            },
            recv: {
                tracks: []
            },
            bytesSent: 0,
            bytesReceived: 0
        },
        video: {
            send: {
                tracks: []
            },
            recv: {
                tracks: []
            },
            bytesSent: 0,
            bytesReceived: 0
        },
        results: {},
        connectionType: {},
        connectionType: {
            local: {},
            remote: {}
        },
        resolutions: {
            send: {},
            recv: {}
        },
        internal: {
            audio: {
                send: {},
                recv: {}
            },
            video: {
                send: {},
                recv: {}
            },
            candidates: {}
        },
        nomore: function() {
            nomore = true;
        }
    };

    var getStatsParser = {
        checkIfOfferer: function(result) {
            if (result.type === 'googLibjingleSession') {
                getStatsResult.isOfferer = result.googInitiator;
            }
        }
    };

    var peer = this;

    if (arguments[0] instanceof RTCPeerConnection) {
        peer = arguments[0];

        if (!!navigator.mozGetUserMedia) {
            mediaStreamTrack = arguments[1];
            callback = arguments[2];
            interval = arguments[3];
        }

        if (!(mediaStreamTrack instanceof MediaStreamTrack) && !!navigator.mozGetUserMedia) {
            throw '2nd argument is not instance of MediaStreamTrack.';
        }
    } else if (!(mediaStreamTrack instanceof MediaStreamTrack) && !!navigator.mozGetUserMedia) {
        throw '1st argument is not instance of MediaStreamTrack.';
    }

    var nomore = false;

    function getStatsLooper() {
        getStatsWrapper(function(results) {
            results.forEach(function(result) {
                Object.keys(getStatsParser).forEach(function(key) {
                    if (typeof getStatsParser[key] === 'function') {
                        getStatsParser[key](result);
                    }
                });
            });

            try {
                // failed|closed
                if (peer.iceConnectionState.search(/failed/gi) !== -1) {
                    nomore = true;
                }
            } catch (e) {
                nomore = true;
            }

            if (nomore === true) {
                if (getStatsResult.datachannel) {
                    getStatsResult.datachannel.state = 'close';
                }
                getStatsResult.ended = true;
            }

            // allow users to access native results
            getStatsResult.results = results;

            callback(getStatsResult);

            // second argument checks to see, if target-user is still connected.
            if (!nomore) {
                typeof interval != undefined && interval && setTimeout(getStatsLooper, interval || 1000);
            }
        });
    }

    // a wrapper around getStats which hides the differences (where possible)
    // following code-snippet is taken from somewhere on the github
    function getStatsWrapper(cb) {
        // if !peer or peer.signalingState == 'closed' then return;

        if (typeof window.InstallTrigger !== 'undefined') {
            peer.getStats(
                mediaStreamTrack,
                function(res) {
                    var items = [];
                    res.forEach(function(r) {
                        items.push(r);
                    });
                    cb(items);
                },
                cb
            );
        } else {
            peer.getStats(function(res) {
                var items = [];
                res.result().forEach(function(res) {
                    var item = {};
                    res.names().forEach(function(name) {
                        item[name] = res.stat(name);
                    });
                    item.id = res.id;
                    item.type = res.type;
                    item.timestamp = res.timestamp;
                    items.push(item);
                });
                cb(items);
            });
        }
    };

    getStatsParser.datachannel = function(result) {
        if (result.type !== 'datachannel') return;

        getStatsResult.datachannel = {
            state: result.state // open or connecting
        }
    };

    getStatsParser.googCertificate = function(result) {
        if (result.type == 'googCertificate') {
            getStatsResult.encryption = result.googFingerprintAlgorithm;
        }
    };

    getStatsParser.checkAudioTracks = function(result) {
        if (result.googCodecName !== 'opus') return;

        var sendrecvType = result.id.split('_').pop();

        if (result.bytesSent) {
            var kilobytes = 0;
            if (!!result.bytesSent) {
                if (!getStatsResult.internal.audio[sendrecvType].prevBytesSent) {
                    getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
                }

                var bytes = result.bytesSent - getStatsResult.internal.audio[sendrecvType].prevBytesSent;
                getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;

                kilobytes = bytes / 1024;
            }

            getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
        }

        if (result.bytesReceived) {
            var kilobytes = 0;
            if (!!result.bytesReceived) {
                if (!getStatsResult.internal.audio[sendrecvType].prevBytesReceived) {
                    getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
                }

                var bytes = result.bytesReceived - getStatsResult.internal.audio[sendrecvType].prevBytesReceived;
                getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;

                kilobytes = bytes / 1024;
            }

            getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
        }

        if (getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
            getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
        }
    };

    getStatsParser.checkVideoTracks = function(result) {
        if (result.googCodecName !== 'VP8' && result.googCodecName !== 'VP9') return;
        // googCurrentDelayMs, googRenderDelayMs, googTargetDelayMs
        // transportId === 'Channel-audio-1'
        var sendrecvType = result.id.split('_').pop();

        if (!!result.bytesSent) {
            var kilobytes = 0;
            if (!getStatsResult.internal.video[sendrecvType].prevBytesSent) {
                getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;
            }

            var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBytesSent;
            getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;

            kilobytes = bytes / 1024;
        }

        if (!!result.bytesReceived) {
            var kilobytes = 0;
            if (!getStatsResult.internal.video[sendrecvType].prevBytesReceived) {
                getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived;
            }

            var bytes = result.bytesReceived - getStatsResult.internal.video[sendrecvType].prevBytesReceived;
            getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived;

            kilobytes = bytes / 1024;
        }

        getStatsResult.video[sendrecvType].availableBandwidth = kilobytes.toFixed(1);

        if (result.googFrameHeightReceived && result.googFrameWidthReceived) {
            getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthReceived;
            getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightReceived;
        }

        if (result.googFrameHeightSent && result.googFrameWidthSent) {
            getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthSent;
            getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightSent;
        }

        if (getStatsResult.video[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
            getStatsResult.video[sendrecvType].tracks.push(result.googTrackId);
        }
    };

    getStatsParser.bweforvideo = function(result) {
        if (result.type !== 'VideoBwe') return;

        // id === 'bweforvideo'

        getStatsResult.video.bandwidth = {
            googActualEncBitrate: result.googActualEncBitrate,
            googAvailableSendBandwidth: result.googAvailableSendBandwidth,
            googAvailableReceiveBandwidth: result.googAvailableReceiveBandwidth,
            googRetransmitBitrate: result.googRetransmitBitrate,
            googTargetEncBitrate: result.googTargetEncBitrate,
            googBucketDelay: result.googBucketDelay,
            googTransmitBitrate: result.googTransmitBitrate
        };
    };

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

    getStatsParser.dataSentReceived = function(result) {
        var mediaType = result.googCodecName !== 'opus' ? 'video' : 'audio';
        if (!!result.bytesSent) {
            getStatsResult[mediaType].bytesSent += parseInt(result.bytesSent);
        }

        if (!!result.bytesReceived) {
            getStatsResult[mediaType].bytesReceived += parseInt(result.bytesReceived);
        }
    };

    getStatsLooper();

};
