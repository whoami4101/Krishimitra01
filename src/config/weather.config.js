import * as Location from 'expo-location';

export const WEATHER_CONFIG = {
  API_KEY: '669a5c628bacb08e351b9e99a4bcc4f9',
  DEFAULT_LOCATION: {
    lat: 28.6139,
    lon: 77.2090
  }
};

export const getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      return { ...WEATHER_CONFIG.DEFAULT_LOCATION, name: 'Delhi' };
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };

    // Get city name from OpenWeatherMap
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${WEATHER_CONFIG.API_KEY}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        coords.name = data[0].name || data[0].local_names?.en || 'Unknown Location';
      } else {
        coords.name = 'Unknown Location';
      }
    } catch (e) {
      console.error('Error getting city name:', e);
      coords.name = 'Unknown Location';
    }

    return coords;
  } catch (error) {
    console.error('Error getting location:', error);
    return { ...WEATHER_CONFIG.DEFAULT_LOCATION, name: 'Delhi' };
  }
};
