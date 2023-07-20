const express = require('express');
const mqttSubscriber = require('./mqttSubscriber');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to retrieve the latest MQTT message
app.get('/subscribe', (req, res) => {
    const latestMessage = mqttSubscriber.getLatestMessage();
    res.status(200).json({ message: 'Latest MQTT message', data: latestMessage });
    console.log(latestMessage);
});

// Start the REST API server
app.listen(3001, () => {
    console.log('REST API server running on port 3000');
});