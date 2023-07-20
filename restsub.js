const mqtt = require('mqtt');
const username = 'gepc-subs';
const password = '14d1b530';
const clientId = 'f44a7c6a-219f-417d-9a1d-f2bafd38ad53';

//local test
const Url = 'mqtt://test.mosquitto.org:1883';
const host = '10.246.0.10:1883';
const mqttTopic = ['MC/V1/AUT/au1/OSPMS/CB/E0017/Status_Closed','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/CB/E0002/Status_Closed','MC/V1/AUT/au1/OSPMS/DRIVE/E0003/Status_Running_1','MC/V1/AUT/au1/OSPMS/DRIVE/E0010/Power_Consumed_KW','MC/V1/AUT/au1/OSPMS/BUS/E0008/Total_Power_KW'];
// Create an MQTT client
//local test
const mqttClient = mqtt.connect(Url);
const mqttClient1 = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
clientId,
 clean: true,
 rejectUnauthorized: false
});
let latestMessage = null; // Variable to store the latest MQTT message

// Subscribe to the MQTT topic
mqttClient.on('connect', () => {
    console.log('Running.....REST API');

    mqttClient.subscribe(mqttTopic, (err) => {
        if (err) {
            console.error('Error subscribing to topic:', err);
        } else {
            console.log('Subscribed to topic:', mqttTopic);
        }
    });
});

// Listen for MQTT messages
mqttClient.on('message', (topic, message) => {
    console.log('Subscribe topic:', topic);
    //console.log('Test12:', topic);
    //console.log('Received message:', JSON.parse(message.toString()));
    //console.log('Test125555:', topic);

    // Update the latest message
    try {
        latestMessage = JSON.parse(message.toString());
        // Process the JSON payload as needed
        console.log('Recived Message:', latestMessage);
    } catch (error) {
        console.error('Error parsing JSON payload:', error);
    }

});

mqttClient.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

module.exports = {
    getLatestMessage: () => latestMessage, // Function to retrieve the latest message
};
const express = require('express');
//const mqttSubscriber = require('./mqttSubscriber');

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
    console.log('REST API server running on port 3001');
});