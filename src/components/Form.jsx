import React, { useState } from 'react'

const Form = ({ clocks, setClocks }) => {
    const [newCityName, setNewCityName] = useState('');
    const [timezoneOffset, setTimezoneOffset] = useState('');

    const onSubmitButton = (e) => {
        e.preventDefault()

        if (!newCityName || !timezoneOffset) return

        const existingClockIndex = clocks.findIndex(clock =>
            clock.city === newCityName &&
            clock.timezone === timezoneOffset
        );

        if (existingClockIndex >= 0) return

        setClocks([...clocks, {
            city: newCityName,
            timezone: timezoneOffset
        }])

        e.target.reset()
    }

    return (
        <form className="form" onSubmit={onSubmitButton}>
            <input type="text" name="city" placeholder="Город" className="city" value={newCityName} onChange={e => setNewCityName(e.target.value)} />
            <input type="number" name="number" placeholder="+/- N часов" className="timezone" value={timezoneOffset} onChange={e => setTimezoneOffset(e.target.value)} />
            <button type="submit">Добавить</button>
        </form>
    )
}

export default Form
