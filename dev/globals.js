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
            streams: 0,
            googNacksSent: 0,
            googPlisSent: 0,
            googFirsReceived: 0,
            googRtt: 0
        },
        recv: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0,
            googNacksReceived: 0,
            googPlisReceived: 0,
            googFirsReceived: 0
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

/**
 * Video Counter helper function
 * @param {String} paramName
 * @param {String} op - default `+`
 * @param {Number} scale - default 1
 * @param {String} userFiled - default paramName
 * @returns {resetMethod} resetMethod - reset prevValue
 */
function creatVideoCounter(result, paramName, type, op, scale, userFiled) {
    // 当参数合并后，根据 googNacksSent 来判断recv/send Kb Mb Gb
    if (!!result[paramName] && result[paramName] !== '0') {
        var Count = 0;
        if (!getStatsResult.internal.video[type]['prev' + paramName] || getStatsResult.internal.video[type]['prev' + paramName] > result[paramName]) {
            getStatsResult.internal.video[type]['prev' + paramName] = result[paramName];
        }
        if ((op || '+') === '+') {
            Count = result[paramName] + getStatsResult.internal.video[type]['prev' + paramName];
        } else {
            Count = result[paramName] - getStatsResult.internal.video[type]['prev' + paramName];
        }
        getStatsResult.internal.video[type]['prev' + paramName] = result[paramName];
        getStatsResult.video[type][userFiled || paramName] = Count * (scale || 1);

        var reset = function(reset) {
            getStatsResult.video[type]['prev' + (userFiled || paramName)] = reset;
        };
        reset.toString = function() {
            return getStatsResult.video[type][userFiled || paramName];
        }
        return reset;
    }
    return;
}
