var peer = this;

if (typeof arguments[0].getStats !== 'function') {
    throw '1st argument is not exit getStats function';
}

if (arguments[0] instanceof RTCPeerConnection) {
    peer = arguments[0];

    if (!!navigator.mozGetUserMedia) {
        mediaStreamTrack = arguments[1];
        callback = arguments[2];
        interval = arguments[3];
    }

    if (!!navigator.mozGetUserMedia && !(mediaStreamTrack instanceof MediaStreamTrack)) {
        console.warn('2nd argument is not instance of MediaStreamTrack.');
    }
} else if (!!navigator.mozGetUserMedia && !(mediaStreamTrack instanceof MediaStreamTrack)) {
      console.warn('1st argument is not instance of MediaStreamTrack.');
}
