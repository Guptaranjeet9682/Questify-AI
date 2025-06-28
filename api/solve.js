// File: api/solve.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
          // Agar API Key nahi mili to yeh error bhejega
          return res.status(500).json({ error: { message: 'API Key server par nahi mili. Kripya Vercel Environment Variables check karein.' }});
        }

        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        // Agar Google se koi error aaye to use aage bhejega
        if (!googleResponse.ok) {
          const errorData = await googleResponse.json();
          return res.status(googleResponse.status).json(errorData);
        }

        const data = await googleResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: { message: 'Server par ek anjaan error aayi.' }});
    }
};
