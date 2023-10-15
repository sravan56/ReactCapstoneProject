import React, { useState, useEffect } from "react";
import axios from "axios";
import pressureIcon from "../images/Vector (3).png";
import windIcon from "../images/Vector (4).png";
import humidityIcon from "../images/Group.png";
import "../styles/Weather.css";


const Weather = () => {
  const [weather, setWeather] = useState("");
  const apiKey = "792dabc73026489fa3384802230210";

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=New York`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather", error);
      });
  }, [apiKey]);
  if (!weather) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours > 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };
  const lastUpdated = new Date(weather.current.last_updated);
  return (
    <div className="weather">
      <div className="date_time">
        <h2>{`${formatDate(lastUpdated)}`}</h2>
        <h2>{`${formatTime(lastUpdated)}`}</h2>
      </div>
      <div className="degree">
        <div className="cond">
          <img src={weather.current.condition.icon} alt="icon"></img>
          <h3>{weather.current.condition.text}</h3>
        </div>
        <div className="line"></div>
        <div className="tepr">
          <h1>{weather.current.temp_c}°C</h1>
          <img src={pressureIcon} alt="pressureIcon" />
          <h3>{weather.current.pressure_mb} mbar</h3>
          <h3>Pressure</h3>
        </div>
        <div className="line1"></div>
        <div className="wihu">
          <img src={windIcon} alt="windIcon" />
          <h6>{weather.current.wind_kph} km/h</h6>
          <h6>Wind</h6>
          <img src={humidityIcon} alt="humidityIcon" />
          <h6>{weather.current.humidity}%</h6>
          <h6>Humidity</h6>
        </div>
      </div>
    </div>
  );
};

export default Weather;
