const express = require('express');
const morgan = require('morgan');
const path = require('path');
const wikipedia = require('./wikipedia');

const app = express();

// Setup logger
app.use(morgan([
  ':remote-addr',
  ':remote-user',
  '[:date[clf]]',
  '":method :url HTTP/:http-version"',
  ':status', 
  ':res[content-length]',
  ':response-time ms'
].join(' ')));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/search', (req, res) => {
  wikipedia.fetchTitlesAndThumbnails(req.query.kw)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      console.error(error.toString());
      res.status(500).json({error: error.toString()});
    });
});

module.exports = app;

