getStatsLooper();

};

if (typeof module !== 'undefined' /* && !!module.exports*/ ) {
    module.exports = getStats;
}

if (typeof define === 'function' && define.amd) {
    define('getStats', [], function() {
        return getStats;
    });
}
