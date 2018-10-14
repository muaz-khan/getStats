// a wrapper around getStats which hides the differences (where possible)
// following code-snippet is taken from somewhere on the github
function getStatsWrapper(cb) {
    if (!peer || peer.signalingState == 'closed') return;

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
                try {
                    res.names().forEach(function(name) {
                        item[name] = res.stat(name);
                    });
                } catch (error) {
                    console.error(error);
                }
                item.id = res.id;
                item.type = res.type;
                item.timestamp = res.timestamp;
                items.push(item);
            });
            cb(items);
        });
    }
};
