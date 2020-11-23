import React, { useState, useEffect } from 'react';
import Stoplight from './components/Stoplight';
import './index.css';
import './App.css';
import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
AWS.config.region = 'us-east-1' // your region
AWS.config.credentials = AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  }) // See AWS Setup and Security below 

function App() {
    // const [message, setMessage] = useState(null);

    // async function getHelloMessage() {
    // 	let message = await fetch('/hello');
    // 	let result = await message.text();
    // 	setMessage(result);
    // }

    useEffect(() => {
        // TODO: fetch the data          
        const client = new AWSMqttClient({
        region: AWS.config.region,
        credentials: AWS.config.credentials,
        endpoint: process.env.REACT_APP_ENDPOINT, // NOTE: get this value with `aws iot describe-endpoint`
        expires: 600, // Sign url with expiration of 600 seconds
        clientId: 'Stoplight-App', // clientId to register with MQTT broker. Need to be unique per client
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        } 
        })

        client.on('connect', () => {
            console.log('connection succesful')
            client.subscribe('Semaphore', function(err) {
                if(!err) {
                   console.log('subscription to Sempahore succesful')
                }
            })
            client.subscribe('Dashboard', function(err) {
                if(!err) {
                   console.log('subscription to Dashboard succesful')
                }
            })
        })
        client.on('message', (topic, message) => {
            if(topic === 'Semaphore') {

                console.log(`Message Received is ${message.toString()}.`)
                //Logica del semaforo luego de recibir distancia


                //Logica de envio del conteo de informacion al dashboard
                client.publish('Dashboard',JSON.stringify(
                    {
                        time: 'Remaining time until Green Light is: X seconds', 
                        distance: 'Crosswalk distance is: X meters',
                    }))
            }

       
        })

    }, []);

    return (
        <div style={{ height: '100%' }}>
            <Stoplight />
        </div>
    );
}

export default App;
