import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';
import './index.css';

function App() {
    const [user, setUser] = useState(null);

    function handleUserLogin(id) {
        setUser({ id, name: 'bob' });
    }

    useEffect(() => {
        // TODO: fetch the data
        const userId = window.localStorage.getItem('userId');
        if (!!userId) {
            setUser({ id: userId, name: 'Bob' });
        }
    }, []);

    function handleButtonPress() {
        alert('jaja cruzando xd');
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
