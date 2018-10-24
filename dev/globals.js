var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

if (typeof MediaStreamTrack === 'undefined') {
    MediaStreamTrack = {}; // todo?
}

var systemNetworkType = ((navigator.connection || {}).type || 'unknown').toString().toLowerCase();

var getStatsResult = {
    encryption: 'sha-256',
    audio: {
        send: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0
        },
        recv: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0
        },
        bytesSent: 0,
        bytesReceived: 0
    },
    video: {
        send: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0
        },
        recv: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0
        },
        bytesSent: 0,
        bytesReceived: 0
    },
    bandwidth: {
        systemBandwidth: 0,
        sentPerSecond: 0,
        encodedPerSecond: 0,
        helper: {
            audioBytesSent: 0,
            videoBytesSent: 0
        },
        speed: 0
    },
    results: {},
    connectionType: {
        systemNetworkType: systemNetworkType,
        systemIpAddress: '192.168.1.2',
        local: {
            candidateType: [],
            transport: [],
            ipAddress: [],
            networkType: []
        },
        remote: {
            candidateType: [],
            transport: [],
            ipAddress: [],
            networkType: []
        }
    },
    resolutions: {
        send: {
            width: 0,
            height: 0
        },
        recv: {
            width: 0,
            height: 0
        }
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
    },
    bytesToSize: function(bytes) {
        var k = 1000;
        var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
        if (bytes <= 0) {
            return '0 Bytes';
        }
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);

        if (!sizes[i]) {
            return '0 Bytes';
        }
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
};

var getStatsParser = {
    checkIfOfferer: function(result) {
        if (result.type === 'googLibjingleSession') {
            getStatsResult.isOfferer = result.googInitiator;
        }
    }
};
