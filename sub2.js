const mqtt = require('mqtt');

const username = 'gepc-subs';
const password = '14d1b530';
const clientId = 'f44a7c6a-219f-417d-9a1d-f2bafd38ad53';
const host = '10.246.0.10:1883';

// Array of topics to subscribe to
const topics = ['MC/V1/AUT/au1/OSPMS/CB/E0017/Status_Closed','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/CB/E0002/Status_Closed','MC/V1/AUT/au1/OSPMS/DRIVE/E0003/Status_Running_1','MC/V1/AUT/au1/OSPMS/DRIVE/E0010/Power_Consumed_KW','MC/V1/AUT/au1/OSPMS/BUS/E0008/Total_Power_KW'];

// Create an MQTT client instance

const client1 = mqtt.connect('mqtt://test.mosquitto.org:1883');
const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});

// MQTT client event: 'connect'
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to multiple topics
  client.subscribe(topics, (err) => {
    if (err) {
      console.error('Failed to subscribe to topics:', err);
    } else {
      console.log('Subscribed to topics:', topics);
    }
  });
});

// MQTT client event: 'message'
client.on('message', (topic, message) => {
  console.log(`Received message on topic '${topic}':`, message.toString());
});

// MQTT client event: 'error'
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

// MQTT client event: 'close'
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});
