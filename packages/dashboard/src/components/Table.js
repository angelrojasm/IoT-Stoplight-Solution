import React from 'react';

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <th>Nombre</th>
                <th>Valor</th>
            </thead>
            {Object.keys(data).map((item, i) => {
                return (
                    <tr>
                        <th>{item}</th>
                        <th>{data[item]}</th>
                    </tr>
                );
            })}
        </table>
    );
};

export default Table;
