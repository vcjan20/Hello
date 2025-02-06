const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files (like HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for data
app.get('/data', async (req, res) => {
  try {
    // Replace with the actual external API URL and your API key
    const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=b654deb78ad5443281e104946250602&q=Pune');

    // Map the API response to the desired structure
    const data = [
      {
        field1: response.data.current.temp_c,  // Temperature in Celsius
        field2: response.data.current.humidity, // Humidity
        field3: response.data.current.wind_kph  // Wind Speed
      }
    ];

    res.json(data);  // Send the transformed data to the frontend
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Error fetching data');
  }
});

// Define a route for the root path ("/") to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
