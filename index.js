require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const originalurl = [];
const shorturl = [];

// Your first API endpoint
app.post('/api/shorturl/', (req, res) => {
  const url = req.body.url;
  const foundIndex = originalurl.indexOf(url);

  if (url.includes('http://') || url.includes('https://')) {
    if (foundIndex < 0) {
      originalurl.push(url);
      shorturl.push(originalurl.length - 1);
      res.json({ original_url: url, short_url: originalurl.length - 1 });
    } else {
      res.json({ original_url: url, short_url: foundIndex });
    }
  } else {
    res.json({ error: 'invalid url' });
  }
})

app.get('/api/shorturl/:short', (req, res) => {
  const short = parseInt(req.params.short);
  const foundIndex = shorturl.indexOf(short);

  if (foundIndex < 0) {
    return res.json({ error: 'invalid url' });
  } else {
    return res.redirect(originalurl[foundIndex]);
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
