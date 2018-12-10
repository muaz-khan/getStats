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

    if (result.type == 'inbound-rtp') {
        creatVideoCounter('nackCount', 'recv', '+', 1, 'googNacksReceived');
        creatVideoCounter('pliCount', 'recv', '+', 1, 'googPlisReceived');
        creatVideoCounter('firCount', 'recv', '+', 1, 'googFirsReceived');
    }

    if (result.type == 'outbound-rtp') {
        creatVideoCounter('nackCount', 'send', '+', 1, 'googNacksSent');
        creatVideoCounter('pliCount', 'send', '+', 1, 'googPlisSent');
        creatVideoCounter('firCount', 'send', '+', 1, 'googFirsSent');
    }
}
