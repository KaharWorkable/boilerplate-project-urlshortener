require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

//url shorterner

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/shorturl/:short', function(req, res) {
  var short = req.params.short;
  res.json({ original_url: 'https://www.google.com', short_url: short });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
