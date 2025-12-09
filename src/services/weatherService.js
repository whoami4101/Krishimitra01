import axios from 'axios';
import { WEATHER_CONFIG } from '../config/weather.config';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: WEATHER_CONFIG.API_KEY,
          units: 'metric'
        }
      });
      return {
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  async getForecast(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: WEATHER_CONFIG.API_KEY,
          units: 'metric'
        }
      });
      
      const dailyData = {};
      response.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            humidity: [],
            wind: [],
            rain: 0,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          };
        }
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].humidity.push(item.main.humidity);
        dailyData[date].wind.push(item.wind.speed);
        if (item.rain) dailyData[date].rain += item.rain['3h'] || 0;
      });

      return Object.entries(dailyData).slice(0, 5).map(([date, data]) => ({
        date,
        temp: Math.round(data.temps.reduce((a, b) => a + b) / data.temps.length),
        tempMin: Math.round(Math.min(...data.temps)),
        tempMax: Math.round(Math.max(...data.temps)),
        humidity: Math.round(data.humidity.reduce((a, b) => a + b) / data.humidity.length),
        windSpeed: (data.wind.reduce((a, b) => a + b) / data.wind.length).toFixed(1),
        rainfall: data.rain.toFixed(1),
        description: data.description,
        icon: data.icon
      }));
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
};
