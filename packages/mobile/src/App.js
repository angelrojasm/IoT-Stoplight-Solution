
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';
import './index.css';
import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
AWS.config.region = 'us-east-1' // your region
AWS.config.credentials = AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  }) // See AWS Setup and Security below 

function App() {
    const [user, setUser] = useState(null);
    const [client,setClient] = useState();
    function handleUserLogin(id) {
        setUser({ id, name: 'bob' });
    }
 
    useEffect(() => {
        // TODO: fetch the data          
        const client = new AWSMqttClient({
        region: AWS.config.region,
        credentials: AWS.config.credentials,
        endpoint: process.env.REACT_APP_ENDPOINT, // NOTE: get this value with `aws iot describe-endpoint`
        expires: 600, // Sign url with expiration of 600 seconds
        clientId: 'Mobile-App', // clientId to register with MQTT broker. Need to be unique per client
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        } 
        })

        client.on('connect', () => {
            client.subscribe('Semaphore', function(err) {
                if(!err) {
                   console.log('subscription to semaphore succesful')
                }
            })
            client.subscribe('Mobile', function(err) {
                if(!err) {
                   console.log('subscription to mobile succesful')
                }
            })
        })
        client.on('message', (topic, message) => {
        if(topic === 'Mobile') {
            //Begin Countdown and vibration for stoplight timer
            console.log(`Message Received is ${message.toString()}.`)
        }
        })
        const userId = window.localStorage.getItem('userId');
        if (!!userId) {
            setUser({ id: userId, name: 'Bob' });
        }
        setClient(client)
    }, []);

    function handleButtonPress() {
        //Codigo de calculo de proximidad con express:


        //Envio de mensaje con la informacion necesaria al semaforo:
        client.publish('Semaphore', JSON.stringify({message: "Mobile Distance to Semaphore is X meters"}))
    }

    return (
        <>
            {user === null ? (
                <Login setUser={handleUserLogin} />
            ) : (
                <div>
                    <button onClick={handleButtonPress}>Quiero cruzar</button>
                </div>
            )}
        </>
    );
}

export default App;
