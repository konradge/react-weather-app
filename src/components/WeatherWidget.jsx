import React from "react";

import weatherstack, { defaultParams } from "../api/weatherstack";

import "./style.css";
import NewCitySearch from "./NewCitySearch";
import { WiHumidity, WiThermometer, WiStrongWind } from "weather-icons-react";
export default class WeatherWidget extends React.Component {
  state = {
    weather: {},
    message: "",
    //0:Warte auf Sucheingabe, 1: Sucheingabe erfolgt 2:Search for coordinates
    status: 0,
  };
  constructor(props) {
    super(props);
    if (this.props.coordSearch) {
      this.getCoordinates();
    }
  }

  getCoordinates() {
    window.navigator.geolocation.getCurrentPosition(
      (pos) =>
        this.getWeather(pos.coords.latitude + "," + pos.coords.longitude),
      (err) => this.setState({ status: 0, message: err.message })
    );
  }

  async getWeather(searchTerm) {
    this.setState({ message: "Loading data from weatherstack.com..." });
    let weather = await weatherstack.get("/current", {
      params: {
        ...defaultParams,
        query: searchTerm,
      },
    });
    if (weather.data.error) {
      this.setState({ status: 0 });
      this.setState({ message: weather.data.error.info });
    } else {
      this.setState({ weather: weather.data, status: 1 });
      if (this.props.addWidget && !this.props.coordSearch) {
        this.props.addWidget();
      }
    }
  }

  render() {
    if (this.state.status === 0) {
      return (
        <NewCitySearch
          getWeather={this.getWeather.bind(this)}
          message={this.state.message}
        />
      );
    } else {
      let style =
        this.state.weather.current.is_day === "no"
          ? "widget darkmode"
          : "widget lightmode";
      let localtime = new Date(this.state.weather.location.localtime);
      return (
        <div className={style}>
          <div className="delete">
            <i
              className="close icon"
              onClick={() => this.props.onDelete(this.props.id)}
            ></i>
          </div>
          <div className="ui header location">
            {this.state.weather.location.name +
              ", " +
              this.state.weather.location.country}
          </div>
          <div className="body">
            <div className="time">
              {localtime.getHours() +
                ":" +
                (localtime.getMinutes() < 10 ? "0" : "") +
                localtime.getMinutes()}
            </div>
            <div className="weather-temp">
              <img
                src={this.state.weather.current.weather_icons[0]}
                alt={this.state.weather.current.weather_descriptions[0]}
              />
              <div>{this.state.weather.current.temperature}°C</div>
            </div>
            <div className="humidity infos">
              <WiHumidity size={30} className="icon" />
              <div className="data">
                {this.state.weather.current.humidity}
                <div className="small">%</div>
              </div>
            </div>
            <div className="infos">
              <WiThermometer size={30} className="icon" />
              <div className="data">
                {this.state.weather.current.feelslike}
                <div className="small">°C</div>
              </div>
            </div>
            <div className="infos">
              <WiStrongWind size={30} className="icon" />
              <div className="data">
                {this.state.weather.current.wind_speed}
                <div className="small">km/h</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
