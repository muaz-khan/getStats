// a wrapper around getStats which hides the differences (where possible)
// following code-snippet is taken from somewhere on the github
function getStatsWrapper(cb) {
    peer.getStats(window.mediaStreamTrack || null).then(function(res) {
        var items = [];
        res.forEach(function(r) {
            items.push(r);
        });
        cb(items);
    }).catch(cb);
};
