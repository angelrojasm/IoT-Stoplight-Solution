import React, { useEffect, useState, useRef } from 'react';

const Countdown = ({ time, onFinish }) => {
    const [timeLeft, setTimeLeft] = useState(time);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(interval.current);
            onFinish();
        }
    }, [timeLeft]);

    return <div>{timeLeft}</div>;
};

export default Countdown;
