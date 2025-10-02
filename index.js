const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = "instagram-downloader-api.p.rapidapi.com";

app.get('/download', async (req, res) => {
  const reelUrl = req.query.url;
  if(!reelUrl) return res.status(400).send("URL missing");

  try {
    const response = await axios.get(`https://${RAPIDAPI_HOST}/reel`, {
      params: { url: reelUrl },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      responseType: 'json'
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error fetching reel");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
