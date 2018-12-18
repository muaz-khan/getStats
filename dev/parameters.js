var peer = this;

if (!(arguments[0] instanceof RTCPeerConnection)) {
    throw '1st argument is not instance of RTCPeerConnection.';
}

peer = arguments[0];

if (arguments[1] instanceof MediaStreamTrack) {
    console.warn('Do not pass MediaStreamTrack on getStats. Otherwise it will return results for only that track.');

    mediaStreamTrack = arguments[1]; // redundant
    callback = arguments[2];
    interval = arguments[3];
}
