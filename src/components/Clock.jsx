const Clock = ({ clock, currentTime, deleteClock }) => {
    const { city, timezone } = clock;

    const localTime = new Date(currentTime.getTime() + (timezone * 3600000));

    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');

    return (
        <div className="clock-container">
            <div className="city">{city}:</div>
            <div className="time">{`${hours}:${minutes}:${seconds}`}</div>
            <button className="delete" onClick={deleteClock}>Удалить</button>
        </div>
    );
};

export default Clock;
