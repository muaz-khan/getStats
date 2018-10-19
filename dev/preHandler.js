function preHandler(result) {
    // 根据codeId\trackId映射 - 处理关联关系
    var idMap = result.reduce(function(map, item) {
        if (item.type != 'codec' && item.type != 'track' && item.type != 'transport') return map;
        map[item.id] = item;
        return map;
    }, {});
    // 若与原有字段有冲突，则在其他代码中做值检测，并用其他字段进行判断。例如sendrecvType
    return result.reduce(function(sum, item) {
        if (item.type != 'outbound-rtp' && item.type != 'inbound-rtp' && item.type.indexOf('candidate') < 0) {
            sum.push(item);
            return sum;
        }
        // 兼容candidate相关参数 - 处理字段兼容，转义
        if (item.type.indexOf('candidate') >= 0) {
            if (item.ip) {
                item.ipAddress = item.ip;
            }
            if (item.protocol) {
                item.googTransportType = item.protocol;
            }
            if (item.state) {
                item.googActiveConnection = item.state == 'succeeded';
            }
            if (item.port) {
                item.portNumber = item.port;
            }
        };
        // item.type can't change
        item = Object.assign({}, idMap[item.transportId], idMap[item.codecId], idMap[item.trackId], item);
        if (item.mimeType) {
            item.googCodecName = item.mimeType.split('/')[1];
        }
        sum.push(item);
        return sum;
    }, []);
}
