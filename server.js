const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express();

app.get('/api/og-image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      res.json({ ogImage });
    } else {
      res.status(404).json({ error: 'og:image not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000')); 