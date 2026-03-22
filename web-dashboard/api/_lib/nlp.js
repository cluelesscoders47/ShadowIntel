const performNetworkTelemetry = (url) => {
    const isLocal = url.includes('localhost') || url.includes('127.0.0.1');
    const isOnion = url.includes('.onion');

    return {
        resolvedIp: isLocal ? "127.0.0.1" : (isOnion ? "Hidden via Tor" : "104.80.21.45"),
        routing: isOnion ? "Tor Network (Encrypted)" : (isLocal ? "Local Loopback" : "Standard Clearnet HTTP/S"),
        hostname: isLocal ? "localhost" : (isOnion ? "Tor Onion Service" : "Surface Web Endpoint"),
        anonymized: isOnion,
        interfaceRisk: isOnion ? "UNTRUSTED (Dark Web)" : (isLocal ? "BASELINE (Safe)" : "MODERATE (Surface Web)")
    };
};

module.exports = { performNetworkTelemetry };
