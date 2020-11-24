import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import './App.css';
import './index.css';
import AWS from 'aws-sdk/global';
import AWSMqttClient from 'aws-mqtt';
import Countdown from './components/Countdown';

AWS.config.region = 'us-east-1'; // your region
AWS.config.credentials = AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
}); // See AWS Setup and Security below

function App() {
    const [user, setUser] = useState(null);
    const [countdown, setCountdown] = useState(null);

    function handleUserLogin(id) {
        setUser({ id, name: 'bob' });
    }

    const client = useRef();

    useEffect(() => {
        // TODO: fetch the data
        client.current = new AWSMqttClient({
            region: AWS.config.region,
            credentials: AWS.config.credentials,
            endpoint: process.env.REACT_APP_ENDPOINT, // NOTE: get this value with `aws iot describe-endpoint`
            expires: 600, // Sign url with expiration of 600 seconds
            clientId: 'Mobile-App', // clientId to register with MQTT broker. Need to be unique per client
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false,
            },
        });

        client.current.on('connect', () => {
            client.current.subscribe('Semaphore', function (err) {
                if (!err) {
                    console.log('subscription to semaphore succesful');
                }
            });
            client.current.subscribe('Mobile', function (err) {
                if (!err) {
                    console.log('subscription to mobile succesful');
                }
            });
        });
        client.current.on('message', (topic, message) => {
            if (topic === 'Mobile') {
                //Begin Countdown and vibration for stoplight timer
                // setCountdown(JSON.parse(message.toString()).time);
                // console.log(`Message Received is ${message.toString()}.`);
                const { time } = JSON.parse(message.toString());
                if (time) {
                    setCountdown(time);
                }
            }
        });
        const user = window.localStorage.getItem('user');
        if (!!user) {
            setUser({ ...JSON.parse(user).user });
        }
    }, []);

    function handleButtonPress() {
        navigator.geolocation.getCurrentPosition((position) => {
            let x = { latitude: position.coords.latitude, longitude: position.coords.longitude };

            //Envio de mensaje con la informacion necesaria al semaforo:
            client.current.publish('Semaphore', JSON.stringify(x));
        });
    }

    async function handleCountdownEnd() {
        setCountdown(null);

        await fetch(`/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'El de la 27', id: user._id }),
        });
    }

    return (
        <>
            {user === null ? (
                <Login setUser={handleUserLogin} />
            ) : (
                <div>
                    {countdown == null && (
                        <button onClick={handleButtonPress}>Quiero cruzar</button>
                    )}
                    {countdown && <Countdown time={countdown} onFinish={handleCountdownEnd} />}
                </div>
            )}
        </>
    );
}

export default App;
