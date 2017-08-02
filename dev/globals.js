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
        }
    },
    video: {
        send: {
            tracks: []
        },
        recv: {
            tracks: []
        }
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
