// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = "instagram-reels-downloader-api.p.rapidapi.com"; // correct host

// Root route (simple test)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Reel download route
app.get('/download', async (req, res) => {
  const reelUrl = req.query.url;
  if (!reelUrl) return res.status(400).send("URL missing");

  try {
    const response = await axios.get(`https://${RAPIDAPI_HOST}/download`, {
      params: { url: encodeURIComponent(reelUrl) }, // encode URL
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    res.json(response.data);

  } catch (err) {
    console.error("❌ Error details:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
