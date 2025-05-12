import React, { useState } from 'react';
// import { Card } from '@/components/ui/card';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiWindy } from 'react-icons/wi';

const WeatherData = () => {
  const [city, setCity] = useState('Dhule');
  const [data, setData] = useState(null);

  const fetchWeatherData = async () => {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'f9cf97e38amshc5ab297d43647c3p11849bjsn7d6d67ae33b6',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const getWeatherIcon = (text) => {
    switch (text) {
      case 'Mostly Clear':
      case 'Sunny':
      case 'Partly Cloudy':
        return <WiDaySunny size={48} className="text-yellow-500" />;
      case 'Thunderstorms':
        return <WiThunderstorm size={48} className="text-purple-600" />;
      case 'Rain':
      case 'Showers':
        return <WiRain size={48} className="text-blue-500" />;
      case 'Cloudy':
      case 'Mostly Cloudy':
        return <WiCloudy size={48} className="text-gray-500" />;
      case 'Snow':
        return <WiSnow size={48} className="text-blue-300" />;
      case 'Windy':
        return <WiWindy size={48} className="text-gray-300" />;
      default:
        return <WiDaySunny size={48} className="text-yellow-500" />;
    }
  };

  const { location, forecasts } = data || {};

  return (
    <div className="h-auto overflow-hidden bg-gradient-to-b from-blue-900 to-blue-600 p-8 flex flex-col items-center ">
      <h1 className="text-4xl text-white font-bold mb-6">Weather Forecast</h1>

      <div className="mb-6">
        <input 
          type="text" 
          value={city} 
          onChange={handleInputChange} 
          placeholder="Enter location" 
          className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
        />
        <button 
          onClick={handleSearch} 
          className="ml-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Fetch Data
        </button>
      </div>

      {location && forecasts ? (
        <div className="flex gap-6 overflow-hidden mt-10 md:mb-26">
          <div className="grid grid-cols-4 gap-4">
            {forecasts.slice(0, 4).map((forecast, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                {getWeatherIcon(forecast.text)}
                <div className="text-white">
                  <h3 className="font-semibold">{forecast.day}</h3>
                  <p>{((forecast.high - 32) * 5/9).toFixed(1)}°C / {((forecast.low - 32) * 5/9).toFixed(1)}°C</p>
                </div>
              </div>
            ))}
            {forecasts.slice(4, 7).map((forecast, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                {getWeatherIcon(forecast.text)}
                <div className="text-white">
                  <h3 className="font-semibold">{forecast.day}</h3>
                  <p>{((forecast.high - 32) * 5/9).toFixed(1)}°C / {((forecast.low - 32) * 5/9).toFixed(1)}°C</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-800 p-6 rounded-xl shadow-lg text-white w-80">
            <h2 className="text-2xl font-bold mb-4">Today</h2>
            <div className="flex items-center mb-4">
              {getWeatherIcon(forecasts[0]?.text)}
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{forecasts[0]?.text}</h3>
                <p className="text-lg">{((forecasts[0]?.high - 32) * 5/9).toFixed(1)}°C / {((forecasts[0]?.low - 32) * 5/9).toFixed(1)}°C</p>
              </div>
            </div>
            <p>Wind: {data.current_observation?.wind.speed} km/h</p>
            <p>Humidity: {data.current_observation?.atmosphere.humidity}%</p>
            <p>Visibility: {data.current_observation?.atmosphere.visibility} km</p>
          </div>
        </div>
      ) : (
        <div className='text-white mt-8'>Enter a location and click Fetch Data to see the forecast.</div>
      )}
    </div>
  );
};

export default WeatherData;
