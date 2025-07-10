// File: api/solve.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed.' });
    }
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not configured on the server.' });
        }
        const requestBody = req.body;
        const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const googleResponse = await fetch(googleApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await googleResponse.json();
        if (!googleResponse.ok) {
            console.error('Google API Error:', data);
            return res.status(googleResponse.status).json(data);
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Server-side error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};
