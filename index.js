const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// API endpoint that takes a URL, makes a request to it, and returns the result
app.post('/api/fetch-url', async (req, res) => {
    const { uri } = req.body;

    if (!uri) {
        return res.status(400).json({ error: 'URI is required' });
    }

    try {
        // Fetch the webpage content
        const response = await axios.get(uri);

        // Send the webpage content as the response
        res.send(response.data);
    } catch (error) {
        // Handle errors (e.g., if the URL is invalid or the request fails)
        res.status(500).json({ error: 'Error fetching the URL', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
