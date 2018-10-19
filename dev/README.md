# [getStats.js](https://github.com/muaz-khan/getStats) / [Demo](https://www.webrtc-experiment.com/getStats/)

getStats.js is separated/splitted into unique files.

This directory contains all those development files.

`grunt` tools are used to concatenate/merge all these files into `~/getStats.js`.

> Shoud use es5 , beacuse not config babel

## MOCK PeerConnection.getStats 注意点

- getStats 使用callback(stats)调用
- let result = stats.result() 返回结果格式
```
[
  {timestamp, id: "googTrack_c513d0fd-7f2b-466b-8e58-a1f81860dcfc", type: "googTrack"},
  {timestamp, id: "googLibjingleSession_5624919937048163620", type: "googLibjingleSession"},
  {timestamp, id: "bweforvideo", type: "VideoBwe"},
  {timestamp, id: "googCertificate_51:51:48:63:29:C5:EA:0D:DF:4D:78:1…F:0F:3F:B7:77:50:52:18:90:FD:06:7E:25:7F:4C:F1:47", type: "googCertificate"},
  {timestamp, id: "Channel-audio-tracks-1", type: "googComponent"},
  {timestamp, id: "Cand-F7eFbGlm", type: "localcandidate"},
  {timestamp, id: "Cand-H1jcg4+K", type: "localcandidate"},
  {timestamp, id: "Cand-QMdqzoWl", type: "localcandidate"},
  {timestamp, id: "Cand-pJwrGnxA", type: "localcandidate"},
  {timestamp, id: "Cand-jjhN8NG3", type: "localcandidate"},
  {timestamp, id: "Cand-JOQGwM6K", type: "localcandidate"},
  {timestamp, id: "Conn-audio-tracks-1-0", type: "googCandidatePair"},
  {timestamp, id: "Cand-UxKUpsYK", type: "remotecandidate"},
  {timestamp, id: "Conn-audio-tracks-1-1", type: "googCandidatePair"},
  {timestamp, id: "Conn-audio-tracks-1-2", type: "googCandidatePair"},
  {timestamp, id: "ssrc_1891013080_send", type: "ssrc"},
  {timestamp, id: "ssrc_1184481036_send", type: "ssrc"},
  {timestamp, id: "googTrack_e2f778a3-5bc3-46db-95ec-847a0019349f", type: "googTrack"},
  {timestamp, id: "googTrack_3cbc4a2a-3193-444e-b770-0ba71524f891", type: "googTrack"},
  {timestamp, id: "ssrc_4070233730_recv", type: "ssrc"},
  {timestamp, id: "ssrc_3937225160_recv", type: "ssrc"},
  {timestamp, id: "googCertificate_45:36:CB:94:01:C4:F4:50:D8:0F:A3:A8:7B:95:80:91:2D:BD:82:43", type: "googCertificate"},
  {timestamp, id: "Cand-fF/Thv+S", type: "localcandidate"},
  {timestamp, id: "Cand-kT0bSxwQ", type: "localcandidate"},
]
```
- result[0].names() 返回数据格式
```
["googTrackId"]
```

## webrtc-getstats-rfc VideoBew
> not exit in stand getstats rfc.
```
googAvailableReceiveBandwidth—对于接收视频数据可用的带宽。  

googAvailableSendBandwidth—对于发送视频数据可用的带宽。 

googTargetEncBitrate—视频编码器的目标比特率。这项指标会尝试填满可用的带宽。

googActualEncBitrate—视频编码器输出的比特率。通常这与目标比特率是匹配的。

googTansmitBitrate—这个比特率是实际传输的比特率。如果此数值与实际编码比特率有较大的差别，那么可能是因为前向错误纠正造成的。

googRetransmitBitrate—如果RTX被使用的话，这项允许测量重传的比特率。此数据通常代表丢包率。

googBucketDelay—是Google为了处理大框架速率的策略表示。通常是很小的数值。 
```

so there has a map
```javascript
{
  googAvailableReceiveBandwidth: availableIncomingBitrate,
  googAvailableSendBandwidth: availableOutgoingBitrate,
  googTansmitBitrate: videBitrate + audioBitrate || (candidate.bytesSent - candidate.preBytesSent), // Pseudo code
}

```
## License
[getStats.js](https://github.com/muaz-khan/getStats) is released under [MIT licence](https://www.webrtc-experiment.com/licence/) . Copyright (c) [Muaz Khan](http://www.MuazKhan.com/).
