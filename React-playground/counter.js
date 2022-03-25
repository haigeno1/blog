// https://github.com/shfshanyue/Daily-Question

import { useEffect, useState } from "react";
import "./styles.css";

function CounterWithTimeout() {
    const [count, setCount] = useState(0);
    useEffect(
        () =>
            setTimeout(() => {
                setCount(count + 1);
            }, 1000),
        [count]
    );
    return <h1>{count}</h1>;
}

function CounterWithInterval() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [count]);

    return <h1>{count}</h1>;
}

export default function App() {
    return (
        <div>
            <CounterWithTimeout />
            <CounterWithInterval />
        </div>
    );
}
