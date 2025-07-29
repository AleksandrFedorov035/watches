import React, { Component } from 'react';
import moment from 'moment-timezone';
import './App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().tz(this.props.timezone).format('HH:mm:ss')
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: moment().tz(this.props.timezone).format('HH:mm:ss')
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const time = this.state.time.split(':');
    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const seconds = parseInt(time[2], 10);

    const hourAngle = ((hours % 12) + minutes / 60) * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    return (
      <div className="clock">
        <div className="clock-face">
          <div className="hand hour" style={{ transform: `rotate(${hourAngle}deg)` }}></div>
          <div className="hand minute" style={{ transform: `rotate(${minuteAngle}deg)` }}></div>
          <div className="hand second" style={{ transform: `rotate(${secondAngle}deg)` }}></div>
        </div>
        <button onClick={this.props.onRemove}>x</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      clocks: []
    };
  }

  handleChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const city = this.state.city;
    let timezone = '';

    switch (city) {
      case 'Москва':
      case 'Moscow':
        timezone = 'Europe/Moscow';
        break;
      case 'Лондон':
      case 'London':
        timezone = 'Europe/London';
        break;
      case 'Нью-Йорк':
      case 'New York':
        timezone = 'America/New_York';
        break;
      case 'Токио':
      case 'Tokyo':
        timezone = 'Asia/Tokyo';
        break;
      default:
        timezone = 'UTC'
        break;
    }

    if (this.state.clocks.some(clock => clock.name === city)) return

    this.setState(prevState => ({
      clocks: [...prevState.clocks, { name: city, timezone }]
    }));
  };

  handleRemoveClock = (index) => {
    this.setState(prevState => ({
      clocks: prevState.clocks.filter((_, i) => i !== index)
    }));
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
            placeholder="Введите название города"
          />
          <button type="submit">Добавить часы</button>
        </form>
        <div className='clocks'>
          {this.state.clocks.map((clock, index) => (
            <Clock
              key={index}
              name={clock.name}
              timezone={clock.timezone}
              onRemove={() => this.handleRemoveClock(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
