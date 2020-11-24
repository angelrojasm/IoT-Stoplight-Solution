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

  function calcDist(lat1, lon1, lat2, lon2){
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d;
}
function calcTime(distance) {
    
    if(distance <= 10) {
        return 15;
    }
    else if(distance <= 30) {
        return 10
    } 
    else
    if(distance <= 50) {
        return 5
    }
}


function App() {
     const [state, setState] = useState('red');

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

                //Logica del semaforo luego de recibir distancia
           
                let mobileLocation = JSON.parse(message.toString())
                console.log(mobileLocation)
                //Calcular Distancia y tiempo a alterar al semaforo
                let time = calcTime(calcDist(mobileLocation.latitude,mobileLocation.longitude,18.473232, -69.919237))
                
                //Logica de envio del conteo de informacion al dashboard y de cambio de semaforo
                client.publish('Dashboard',JSON.stringify(
                    {
                        time: time, 
                        distance: 1,
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
