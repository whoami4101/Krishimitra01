# Weather API Integration Setup

## Quick Setup Guide

### 1. Get OpenWeatherMap API Key (FREE)
1. Visit: https://openweathermap.org/api
2. Click "Sign Up" and create a free account
3. Go to "API keys" section in your account
4. Copy your API key

### 2. Configure API Key
Open `src/config/weather.config.js` and replace:
```javascript
API_KEY: 'YOUR_OPENWEATHER_API_KEY'
```
with your actual API key.

### 3. Set Your Location
Update coordinates in `src/config/weather.config.js`:
```javascript
DEFAULT_LOCATION: {
  lat: 28.6139,  // Your farm latitude
  lon: 77.2090   // Your farm longitude
}
```

### 4. Install Dependencies
```bash
npm install
```

## Features Integrated

### Weather Data Available:
- ✅ Current temperature (°C)
- ✅ 5-day forecast
- ✅ Humidity levels (%)
- ✅ Rainfall amount (mm)
- ✅ Wind speed (m/s)
- ✅ Weather descriptions
- ✅ Dynamic weather icons

### API Endpoints Used:
- `/weather` - Current weather data
- `/forecast` - 5-day forecast (3-hour intervals)

## Usage in App

The ForecastScreen now displays:
- Real-time weather data
- 5-day forecast with temperature ranges
- Humidity, rainfall, and wind speed
- Pull-to-refresh functionality
- Loading states

## Free Tier Limits
- 1,000 API calls/day
- 60 calls/minute
- Perfect for farming app usage

## Troubleshooting

### API Key Not Working
- Wait 10-15 minutes after creating account (activation time)
- Check if key is correctly copied in config file

### No Data Showing
- Check internet connection
- Verify coordinates are valid
- Check console for error messages

### Location Issues
- Use https://www.latlong.net/ to find your farm coordinates
- Ensure latitude/longitude format is correct

## Next Steps

Consider adding:
- GPS location detection using expo-location
- Multiple location support
- Weather alerts/notifications
- Historical weather data
