declare module 'getstats' {
  interface GetStatsBandwidth {
    speed: number;
    systemBandwidth: number;
    sentPerSecond: number;
    encodedPerSecond: number;
    helper: {
      audioBytesSent: number;
      videoBytestSent: number;
      videoBytesSent: number;
    };
    availableSendBandwidth: number;
    googActualEncBitrate: number;
    googAvailableSendBandwidth: number;
    googAvailableReceiveBandwidth: number;
    googRetransmitBitrate: number;
    googTargetEncBitrate: number;
    googBucketDelay: number;
    googTransmitBitrate: number;
  }

  interface GetStatsConnectionInfo {
    tracks: string[];
    codecs: string[];
    availableBandwidth: string;
    streams: number;
    framerateMean: number;
    bitrateMean: number;
  }

  interface GetStatsConnectionStream {
    send: GetStatsConnectionInfo;
    recv: GetStatsConnectionInfo;
    bytesSent: number;
    bytesReceived: number;
    latency: number;
    packetsLost: number;
  }

  interface GetStatsNetworkInfo {
    candidateType: string[];
    transport: string[];
    ipAddress: string[];
    networkType: string[];
  }

  interface GetStatsConnectionType {
    systemNetworkType: string;
    systemIpAddress: string[];
    local: GetStatsNetworkInfo;
    remote: GetStatsNetworkInfo;
    transport: string;
  }

  interface GetStatsResolution {
    width: string;
    height: string;
  }

  interface GetStatsResolutions {
    send: GetStatsResolution;
    recv: GetStatsResolution;
  }

  export interface GetStatsResult {
    datachannel: {
      state: 'open' | 'close';
    };
    isOfferer: boolean;
    encryption: string;
    bandwidth: GetStatsBandwidth;
    audio: GetStatsConnectionStream;
    video: GetStatsConnectionStream;
    connectionType: GetStatsConnectionType;
    resolutions: GetStatsResolutions;
    results: any[];

    nomore: () => void;
  }

  export default function getstats(
      rtc: RTCPeerConnection,
      callback: (result: GetStatsResult) => void,
      interval?: number
  ): void;
}
