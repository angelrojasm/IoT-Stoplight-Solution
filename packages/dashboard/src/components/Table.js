import React from 'react';

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                </tr>
            </thead>
            {Object.keys(data).map((item, i) => {
                return (
                    <tr key={i}>
                        <th>{item}</th>
                        <th>{data[item]}</th>
                    </tr>
                );
            })}
        </table>
    );
};

export default Table;
