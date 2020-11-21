import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';
import './index.css';

const data = {
    cruces: 10,
    'hora mas cruzada': '6:00 pm',
};
function App() {
    const [user, setUser] = useState({ name: 'bob' });
    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        // TODO: fetch the data
    }, []);

    return (
        <>
            <h1>Dashboard de {user.name}</h1>
            <Table data={tableData} />
        </>
    );
}

export default App;
