import React, { useEffect, useState, useRef } from 'react';

const RED = 0;
const GREEN = 1;
const YELLOW = 2;

const RED_TIME = 10000;
const YELLOW_TIME = 3000;
const GREEN_TIME = 5000;

const lights = ['red', 'green', 'yellow'];

const Stoplight = ({ setColor, setTimeLeft }) => {
    const [active, setActive] = useState(RED);
    const [timeUntilGreen, setTimeUntilGreen] = useState(RED_TIME);

    const RED_INTERVAL = useRef();
    const YELLOW_INTERVAL = useRef();

    useEffect(() => {
        setTimeLeft(RED_TIME);
    }, []);

    useEffect(() => {
        if (active === RED) {
            clearInterval(YELLOW_INTERVAL.current);
            setColor(RED);
            RED_INTERVAL.current = setInterval(() => {
                setTimeUntilGreen((prev) => Math.max(prev - 1000, 0));
                setTimeLeft((prev) => Math.max(prev - 1000, 0));
            }, 1000);
            setTimeout(() => {
                setActive(GREEN);
            }, RED_TIME);
        }
        if (active === GREEN) {
            clearInterval(RED_INTERVAL.current);
            clearInterval(YELLOW_INTERVAL.current);
            setTimeLeft(0);
            setColor(GREEN);

            setTimeUntilGreen(0);
            setTimeout(() => {
                setActive(YELLOW);
            }, GREEN_TIME);
        }
        if (active === YELLOW) {
            setTimeUntilGreen(RED_TIME + YELLOW_TIME);
            clearInterval(RED_INTERVAL.current);
            setTimeLeft(RED_TIME + YELLOW_TIME);
            setColor(YELLOW);

            YELLOW_INTERVAL.current = setInterval(() => {
                setTimeUntilGreen((prev) => Math.max(prev - 1000, 0));
                setTimeLeft((prev) => Math.max(prev - 1000, 0));
            }, 1000);
            setTimeout(() => {
                setActive(RED);
            }, YELLOW_TIME);
        }
    }, [active]);

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
