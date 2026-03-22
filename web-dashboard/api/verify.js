const { verifyEndpointThreat } = require('./_lib/nlp');

module.exports = (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });
    const { url, fileName } = req.body;
    if (!url && !fileName) return res.status(400).json({ error: "Must provide a URL or filename to scan." });

    const verificationResult = verifyEndpointThreat(url, fileName);
    res.json(verificationResult);
};
