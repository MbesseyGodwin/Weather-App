import React, { useState, useEffect } from 'react';
import './App.css';
import './tailwind.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-2">Get Weather</button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weatherData && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Location:</p>
                  <p className="font-semibold">{weatherData.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Temperature:</p>
                  <p className="font-semibold">{weatherData.main.temp}°C</p>
                  {console.log(weatherData)}
                </div>
                <div>
                  <p className="text-gray-600">Weather:</p>
                  <p className="font-semibold">{weatherData.weather[0].description}</p>
                </div>
                {/* Add more weather details here */}
                <div>
                  <p className="text-gray-600">Country:</p>
                  <p className="font-semibold">{weatherData.sys.country}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
