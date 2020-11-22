import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Login from './components/Login';
import './App.css';
import './index.css';

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
