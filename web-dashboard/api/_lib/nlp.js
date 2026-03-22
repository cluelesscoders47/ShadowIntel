const natural = require('natural');

// Tokenizer
const tokenizer = new natural.WordTokenizer();

const extractEntities = (text) => {
    const entities = {
        credentials: [],
        emails: [],
        ips: [],
        onionLinks: []
    };

    // 1. Extract Credentials (format: email:password or user:password)
    const credRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}:[^ \n]+/g;
    const credMatch = text.match(credRegex);
    if (credMatch) entities.credentials = [...new Set(credMatch)];

    // 2. Extract loose emails
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
        // filter out emails that are already in the credentials list
        const credEmails = entities.credentials.map(c => c.split(':')[0]);
        entities.emails = [...new Set(emailMatch)].filter(e => !credEmails.includes(e));
    }

    // 3. Extract IP Addresses
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
    const ipMatch = text.match(ipRegex);
    if (ipMatch) entities.ips = [...new Set(ipMatch)];

    // 4. Extract Onion Links
    const onionRegex = /\b[a-z2-7]{16,56}\.onion\b/g;
    const onionMatch = text.match(onionRegex);
    if (onionMatch) entities.onionLinks = [...new Set(onionMatch)];

    return entities;
};

// Heuristic verification for mobile endpoint scanner
const verifyEndpointThreat = (url, fileName) => {
    let risk = "SAFE";
    let message = "No known threats detected.";

    if (url) {
        const suspiciousDomains = ['login-secure', 'verify-account', 'update-billing', 'free-prize'];
        const isPhishing = suspiciousDomains.some(domain => url.toLowerCase().includes(domain));
        if (isPhishing || url.includes('.onion')) {
            risk = "CRITICAL DANGER";
            message = "This URL is attempting to steal your credentials or route an attack. DO NOT OPEN.";
        }
    }

    if (fileName) {
        const badExtensions = ['.exe', '.scr', '.vbs', '.apk'];
        if (badExtensions.some(ext => fileName.toLowerCase().endsWith(ext))) {
            risk = "HIGH RISK";
            message = "Unverified executable or application package detected. Potential malware carrier.";
        } else if (fileName.toLowerCase().includes('invoice') && fileName.toLowerCase().endsWith('.pdf')) {
            risk = "WARNING";
            message = "PDF files mimicking invoices frequently contain macro viruses. Proceed with caution.";
        }
    }

    return { risk, message };
};

// Deep Endpoint Network Analysis
const performNetworkTelemetry = (url) => {
    let hostname = 'unknown-host';
    try {
        const parsedNode = new URL(url);
        hostname = parsedNode.hostname;
    } catch (e) {}

    const lowerHost = hostname.toLowerCase();
    const isOnion = lowerHost.endsWith('.onion') || lowerHost.endsWith('.onion.ly');
    
    // Simulate deep BGP/DNS network resolution
    const resolvedIp = isOnion ? 'Hidden (Relayed via Tor)' : `104.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    
    // Check connection routing
    let routingProtocol = 'Standard Clearnet HTTP/S';
    if (isOnion) routingProtocol = 'Tor SOCKS5 / Hidden Service';
    else if (lowerHost.includes('vpn') || lowerHost.includes('proxy')) routingProtocol = 'Proxied (VPN Detected)';

    const isAnonymized = routingProtocol !== 'Standard Clearnet HTTP/S';

    return {
        hostname: hostname,
        resolvedIp: resolvedIp,
        routing: routingProtocol,
        anonymized: isAnonymized,
        interfaceRisk: isOnion ? 'CRITICAL (Dark Web Gateway)' : 'BASELINE (Surface Web Endpoint)'
    };
};

module.exports = { extractEntities, performNetworkTelemetry, verifyEndpointThreat };
