const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const orderRoutes = require('./routes/orderRoutes');      // Import Order routes
const pharmacyRoutes = require('./routes/pharmacyRoutes'); // Import Pharmacy routes

// Use specific prefixes for each route group
app.use('/api/orders', orderRoutes);       // All Order routes will be prefixed with '/api/orders'
app.use('/api/pharmacies', pharmacyRoutes); // All Pharmacy routes will be prefixed with '/api/pharmacies'

// ChatGPT route
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',  // Or 'gpt-4' if your API key supports it
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.message);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
