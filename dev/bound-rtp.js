/**
 * statistical pliCount,nackCount,firCount adapter for `Android Webrtc SDK` 
 * {
 *   googPlisSent(googPlisReceived): pliCount,
 *   googNacksSent(googNacksSent): nackCount,
 *   googFirsSent(googFirsSent): firCount
 * }
 * @param {*} result
 */
getStatsParser.boundRtp = function(result) {

    if (result.type == 'outbound-rtp') {
        creatVideoCounter(result, 'nackCount', 'send', '+', 1, 'googNacksReceived');
        creatVideoCounter(result, 'pliCount', 'send', '+', 1, 'googPlisReceived');
        creatVideoCounter(result, 'firCount', 'send', '+', 1, 'googFirsReceived');
    }
    if (result.type == 'inbound-rtp') {
        creatVideoCounter(result, 'nackCount', 'recv', '+', 1, 'googNacksSent');
        creatVideoCounter(result, 'pliCount', 'recv', '+', 1, 'googPlisSent');
        creatVideoCounter(result, 'firCount', 'recv', '+', 1, 'googFirsSent');
    }
}
