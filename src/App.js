import "./App.css";
import React, { useState, useCallback } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = "8453df9fa77f5af207e4c57784ca7e18";

  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onresult = async (event) => {
      const voiceCity = event.results[0][0].transcript;
      setCity(voiceCity);
      fetchWeather(voiceCity);
    };

    recognition.start();
  };

  const fetchWeather = useCallback(async (searchCity = city) => {
    if (searchCity.trim() === "") return;

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );

      const weatherData = await weatherResponse.json();

      if (
        weatherData.cod !== 200 ||
        searchCity.trim().length < 4
      ) {
        setWeather(null);
        setForecast([]);
        alert("City not found");
        return;
      }

      setWeather(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast.slice(0, 7));
    } catch (error) {
      console.log(error);
    }
  }, [city]);

  return (
    <div className="App">
      <h1>WeatherNova</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={() => fetchWeather()}>
          Search
        </button>

        <button className="voice-btn" onClick={startVoiceSearch}>
          🎤
        </button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h2 className="forecast-title">7-Day Forecast</h2>

          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h3>
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </h3>

                <p>{day.main.temp}°C</p>
                <p>{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {weather && (
        <div className="map-container">
          <h2>Weather Map</h2>

          <iframe
            title="weather-map"
            width="100%"
            height="350"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${weather.name}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
