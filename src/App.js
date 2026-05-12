import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Map auto move
function ChangeMapView({ coords }) {
  const map = useMap();

  useEffect(() => {
  map.flyTo(coords, 12, { duration: 2 });
}, [coords, map]);

  return null;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [coords, setCoords] = useState([28.61, 77.23]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
  if (transcript) {
    setCity(transcript);
    getWeather(transcript);
    resetTranscript();
  }
},[transcript, resetTranscript, getWeather]);

  const getWeather = async (cityName = city) => {
    try {
      // CURRENT WEATHER
      const res = await axios.get(
        `http://localhost:8080/temperature?city=${cityName}`
      );
      setWeather(res.data);

      // FORECAST
      const f = await axios.get(
        `http://localhost:8080/forecast?city=${cityName}`
      );

      if (f.data && f.data.list) {
        const daily = f.data.list.filter((_, i) => i % 8 === 0);
        setForecast(daily);
      }

      // MAP
      const API_KEY = "8453df9fa77f5af207e4c57784ca7e18";
      const geo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      if (geo.data.length > 0) {
        setCoords([geo.data[0].lat, geo.data[0].lon]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">

      <h1>🌤 WeatherNova</h1>

      {/* SEARCH */}
      <div className="search-box">
        <input
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={() => getWeather()}>
          Search
        </button>

        <button onClick={() => SpeechRecognition.startListening()}>
          {listening ? "🎙️" : "🎤"}
        </button>
      </div>

      {/* CURRENT WEATHER */}
      {weather && weather.main && (
        <div className="weather-card">
          <h2>{weather.main.temp}°C</h2>
          <p>{weather.weather[0].description}</p>

          <div className="grid">
            <div>🌡 {weather.main.feels_like}°C</div>
            <div>💧 {weather.main.humidity}%</div>
            <div>🧭 {weather.main.pressure}</div>
            <div>🌬 {weather.wind.speed} m/s</div>
          </div>
        </div>
      )}

      {/* 7 DAY FORECAST */}
      <div className="forecast">
        {forecast.map((day, i) => (
          <div key={i} className="day-card">
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <p>{day.main.temp}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>

      {/* MAP */}
      <MapContainer center={coords} zoom={10} style={{ height: "300px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView coords={coords} />
        <Marker position={coords}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>

    </div>
  );
}

export default App;