const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const path = require('path');
const axios = require('axios');

console.log(`${process.env.NODE_ENV} ENV DETECTED ON SERVER`)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
