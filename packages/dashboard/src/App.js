import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Login from './components/Login';
import './App.css';
import './index.css';
import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
AWS.config.region = 'us-east-1' // your region
AWS.config.credentials = AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  }) // See AWS Setup and Security below 

const data = {
    cruces: 10,
    'hora mas cruzada': '6:00 pm',
};
function App() {
    const [user, setUser] = useState(null);
    const [tableData, setTableData] = useState(data);

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
            clientId: 'Dashboard-App', // clientId to register with MQTT broker. Need to be unique per client
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            } 
            })
    
            client.on('connect', () => {
                console.log('connection succesful')
                client.subscribe('Dashboard', function(err) {
                    if(!err) {
                       console.log('subscription to dashboard succesful')
                    }
                })
                client.subscribe('Mobile', function(err) {
                    if(!err) {
                       console.log('subscription to Mobile succesful')
                    }
                })
            })
            client.on('message', (topic, message) => {
                if(topic === 'Dashboard') {
    
                    //Logica de Agregar info a la tabla
    
     
                    //Logica de envio del conteo del tiempo al movil
                    client.publish('Mobile',JSON.stringify(
                        {
                            time: JSON.parse(message.toString()).time, 
                        }))
                }
    
           
            })
        const userId = window.localStorage.getItem('userId');
        if (!!userId) {
            setUser({ id: userId, name: 'Bob' });
        }
    }, []);

    return (
        <>
            {user === null ? (
                <Login setUser={handleUserLogin} />
            ) : (
                <div>
                    <h1>Dashboard de {user.name}</h1>
                    <Table data={tableData} />
                </div>
            )}
        </>
    );
}

export default App;
