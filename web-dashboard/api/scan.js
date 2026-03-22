const { analyzeIntent } = require('./_lib/classifier');
const { extractEntities, performNetworkTelemetry } = require('./_lib/nlp');
const { fetchDarkWebData } = require('./_lib/crawler');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });
    const { targetUrl } = req.body;
    if (!targetUrl) return res.status(400).json({ error: "Missing target URL" });

    // AI Analysis Pipeline
    const rawText = await fetchDarkWebData(targetUrl);
    const entities = extractEntities(rawText);
    const telemetry = performNetworkTelemetry(targetUrl);
    const intent = analyzeIntent(rawText, targetUrl);

    let finalThreatLevel = 'Low';
    if (intent.category !== 'Safe') {
        if (entities.credentials.length > 0 || entities.onionLinks.length > 0 || telemetry.interfaceRisk.includes('CRITICAL')) {
            finalThreatLevel = 'Critical';
        } else {
            finalThreatLevel = 'Warning';
        }
    }

    res.json({
        success: true,
        source: targetUrl,
        threatLevel: finalThreatLevel,
        aiAnalysis: intent,
        extractedData: entities,
        telemetry: telemetry,
        rawSnippet: rawText.substring(0, 500) + '...'
    });
};
