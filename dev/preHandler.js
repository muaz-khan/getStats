function preHandler(result) {
    // 根据codeId\trackId映射
    var idMap = result.reduce(function(map, item) {
        if (item.type != 'codec' && item.type != 'track') return map;
        map[item.id] = item;
        return map;
    }, {});

    return result.reduce(function(sum, item) {
        if (item.type != 'outbound-rtp' && item.type != 'inbound-rtp') return sum;
        Object.assign(item, idMap[item.codecId]);
        Object.assign(item, idMap[item.trackId]);
        sum.push(item);
        return sum
    }, []);
}
