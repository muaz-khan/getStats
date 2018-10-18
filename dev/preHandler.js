/**
 * @description 合并out-bound/in-bound相关的track\codec信息
 * @param {*} result
 * @returns
 */
function preHandler(result) {
    // 根据codeId\trackId映射
    let idMap = result.reduce(function(map, item) {
        if (item.type != 'codec' && item.type != 'track') return map;
        return map[item.id] = item;
    }, {});

    return result.reduce(function(sum, item) {
        if (item.type != 'outbound-rtp' && item.type != 'inbound-rtp') return sum;
        Object.assign(item, idMap[item.codecId]);
        Object.assign(item, idMap[item.trackId]);
        return sum.push(item);
    }, []);
}
