const express = require('express');
const path = require('path');
const app = express();

// Serve frontend static files
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

app.get('/api/environment', (req, res) => {
  const environment = process.env.NODE_ENV || 'development';
  res.json({ environment });
});

// Redirect requests to /admin to Strapi admin page
app.get('/admin', (req, res) => {
  const endpoint = process.env.NODE_ENV === 'production' ? 'https://www.produrl.com' : 'http://localhost:1337';
  res.redirect(`${endpoint}/admin`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});