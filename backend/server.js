const express = require('express');
const cors = require('cors');
const { analyzeIntent } = require('./classifier');
const { extractEntities, performNetworkTelemetry, verifyEndpointThreat } = require('./nlp');
const { fetchDarkWebData } = require('./crawler');
const { fetchThreatNews, fetchArticleContent } = require('./news_fetcher');

const app = express();

app.use(cors());
app.use(express.json());

// API: Core Dark Web Target Scan
app.post('/api/scan', async (req, res) => {
    const { targetUrl } = req.body;
    if (!targetUrl) return res.status(400).json({ error: "Missing target URL" });

    // Step 1: Scrape text
    const rawText = await fetchDarkWebData(targetUrl);

    // Step 2: Extract structured entities (emails, credentials, IPs)
    const entities = extractEntities(rawText);

    // Step 3: Run Deep Network Telemetry
    const telemetry = performNetworkTelemetry(targetUrl);

    // Step 4: Classify overall intent via AI model
    const intent = analyzeIntent(rawText, targetUrl);

    // Determine aggregate threat level based on findings
    let finalThreatLevel = 'Low';

    if (intent.category !== 'Safe') {
        // Elevate to critical if malicious and has entities or is on the dark web
        if (entities.credentials.length > 0 || entities.onionLinks.length > 0 || telemetry.interfaceRisk.includes('CRITICAL')) {
            finalThreatLevel = 'Critical';
        } else {
            finalThreatLevel = 'Warning';
        }
    } else {
        finalThreatLevel = 'Low';
    }

    res.json({
        success: true,
        source: targetUrl,
        threatLevel: finalThreatLevel,
        aiAnalysis: intent,
        extractedData: entities,
        telemetry: telemetry,
        rawSnippet: rawText.substring(0, 500) + '...' // Return isolated snippet 
    });
});

// API: Mobile Endpoint Verification
app.post('/api/verify', (req, res) => {
    const { url, fileName } = req.body;

    if (!url && !fileName) {
        return res.status(400).json({ error: "Must provide a URL or filename to scan." });
    }

    const verificationResult = verifyEndpointThreat(url, fileName);
    res.json(verificationResult);
});

// API: Fetch Live Threat News from Google
app.get('/api/threat-news', async (req, res) => {
    const news = await fetchThreatNews();
    res.json(news);
});

// API: Proxy News Article Content (Read within System)
app.post('/api/proxy-report', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });
    const content = await fetchArticleContent(url);
    res.json({ content });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`ShadowIntel Local Core Engine active on port ${PORT}`);
    console.log(`Custom Naive Bayes Classifier loaded.`);
    console.log(`Tor SOCKS5 Proxy crawler initialized.`);
});
