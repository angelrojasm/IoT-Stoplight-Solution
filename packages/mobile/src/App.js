import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    function sendApiRequest() {
        console.log('hello world');
    }

    return (
        <div style={{ height: '100%' }}>
            <button onClick={sendApiRequest}>Quiero Cruzar</button>
        </div>
    );
}

export default App;
