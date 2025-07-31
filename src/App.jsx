import './App.css'
import Clock from './components/Clock'
import Form from './components/Form'
import React, { useState, useEffect } from 'react'

const App = () => {
    const [clocks, setClocks] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerID);
    }, []);


    const deleteClock = (index) => setClocks(clocks.filter((_, i) => i !== index))

    return (
        <div className="app">
            <Form clocks={clocks} setClocks={setClocks} />
            <ul>
                {clocks.map((clock, index) => {
                    return (
                        <li key={index}>
                            <Clock clock={clock} currentTime={currentTime} deleteClock={() => deleteClock(index)}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
