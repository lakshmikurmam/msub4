var mqtt = require('mqtt');

const username = 'gepc-subs';
const password = '14d1b530';
const clientId = 'f44a7c6a-219f-417d-9a1d-f2bafd38ad53';
const host = '10.246.0.10:1883';
const Topic = ['MC/V1/AUT/au1/OSPMS/CB/E0017/Status_Closed','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote','MC/V1/AUT/au1/OSPMS/CB/E0002/Status_Closed','MC/V1/AUT/au1/OSPMS/DRIVE/E0003/Status_Running_1','MC/V1/AUT/au1/OSPMS/DRIVE/E0010/Power_Consumed_KW','MC/V1/AUT/au1/OSPMS/BUS/E0008/Total_Power_KW'];

const Broker_URL = 'mqtt://test.mosquitto.org';
var options = {
	clientId: 'MyMQTT',
	port: 1883,
	keepalive : 60
};
const client= mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});
//Local Test
var client1  = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect()
{
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted)
{
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err)
{
    console.log("Reconnect MQTT");
    if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err)
{
    console.log("Error!");
	if (err) {console.log(err);}
}

function after_publish()
{
	//do nothing
}

function mqtt_messsageReceived(topic, message, packet)
{
	console.log('Topic=' +  topic + '  Message=' + message);
}

function mqtt_close()
{
	console.log("Close MQTT");
}