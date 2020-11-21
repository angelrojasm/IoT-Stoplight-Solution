import React, { useState, useEffect } from 'react';

const lights = ['red', 'green', 'yellow'];
const Stoplight = () => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setActive((prev) => (prev + 1) % 3);
        }, 1000);
    }, []);

    return (
        <div className="stoplight-container">
            <div className="stoplight">
                <div className="red-light">
                    <div className={`light ${lights[active] === 'red' ? 'active' : ''}`}></div>
                </div>
                <div className="yellow-light">
                    <div className={`light ${lights[active] === 'yellow' ? 'active' : ''}`}></div>
                </div>
                <div className="green-light">
                    <div className={`light ${lights[active] === 'green' ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Stoplight;
