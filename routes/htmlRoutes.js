const express = require('express');
const path = require('path');

const router = express.Router();

// Helper function to send HTML files
const sendHtmlFile = (res, filePath) => {
  res.sendFile(path.join(__dirname, '..', 'public', filePath));
};

// Route to serve the landing page
router.get('/', (req, res) => {
  sendHtmlFile(res, 'index.html');
});

// Route to serve the notes page
router.get('/notes', (req, res) => {
  sendHtmlFile(res, 'notes.html');
});

module.exports = router;
