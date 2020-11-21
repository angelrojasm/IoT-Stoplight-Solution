import React, { useState, useEffect } from 'react';
import Stoplight from './components/Stoplight';
import './index.css';
import './App.css';

function App() {
    // const [message, setMessage] = useState(null);

    // async function getHelloMessage() {
    // 	let message = await fetch('/hello');
    // 	let result = await message.text();
    // 	setMessage(result);
    // }

    // useEffect(() => {
    // 	getHelloMessage();
    // }, []);

    return (
        <div style={{ height: '100%' }}>
            <Stoplight />
        </div>
    );
}

export default App;
