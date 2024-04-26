const express = require('express');
const path = require('path');
const app = express();
const env = require('dotenv').config();
const contentful = require('contentful');

// Serve frontend static files
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

app.get('/api/environment', (req, res) => {
  const environment = process.env.NODE_ENV || 'development';
  res.json({ environment });
});

// Define a route to handle the API call and return the necessary data
app.get('/api/locations', async (req, res) => {
    try {
      const space = process.env.SPACE ? process.env.SPACE : null;
      const accessToken = process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : null;

        // Initialize the Contentful client
        const client = contentful.createClient({
            space,
            environment: 'master',
            accessToken
        });

        // Retrieve entries from Contentful
        const entries = await client.getEntries();

        // Send the retrieved entries as the response
        res.json(entries);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Error fetching locations' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});