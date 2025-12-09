# KrishiMitra - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd KrishiMitra
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Run on Device
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **iOS**: Press `i` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal or open http://localhost:19006

## 📱 App Flow

1. **Splash Screen** → Shows KrishiMitra logo and tagline
2. **Onboarding** → 3 slides explaining app features
3. **Device Connection** → Connect to ESP32 sensors via Bluetooth/Wi-Fi
4. **Dashboard** → Main screen with real-time sensor data
5. **Navigation Tabs**:
   - 🏠 Dashboard: Live sensor readings
   - 📊 History: Charts and trends
   - 💡 AI Insights: Smart recommendations
   - 🌤️ Forecast: Weather and pest predictions
   - ⚙️ Settings: App configuration

## 🔧 Key Features to Test

### Dashboard
- Pull down to refresh sensor data
- View real-time moisture, temperature, humidity, light, pH, NPK
- Check AI quick insights

### History
- Switch between time filters (Today/7 days/30 days)
- View interactive charts for all sensors
- Tap export button (placeholder)

### AI Insights
- Color-coded recommendations (Green/Yellow/Red)
- Detailed farming advice
- Status indicators for each condition

### Forecast
- 5-day weather predictions
- Pest risk alerts with prevention tips
- Weather icons and probability data

### Settings
- Change crop type (affects recommendations)
- Adjust soil moisture threshold
- Toggle notifications
- Select language preference

## 🛠️ Development Tips

### Adding New Sensors
1. Update `sensorData` in `src/data/mockData.js`
2. Add new `SensorCard` in `DashboardScreen.js`
3. Include in historical charts in `HistoryScreen.js`

### Current Sensors
- Soil Moisture (0-100%)
- Temperature (°C)
- Humidity (0-100%)
- Light Intensity (0-100%)
- pH Level (0-14)
- Nitrogen (N) - ppm
- Phosphorus (P) - ppm
- Potassium (K) - ppm

### Customizing Colors
- Primary: `#4CAF50` (Green)
- Warning: `#FF9800` (Orange)
- Critical: `#F44336` (Red)
- Info: `#2196F3` (Blue)

### Testing Notifications
```javascript
import { scheduleNotification } from './src/utils/notifications';
scheduleNotification('Test Alert', 'This is a test notification');
```

## 📋 Checklist for Demo

- [ ] App starts without errors
- [ ] Splash screen displays correctly
- [ ] Onboarding slides work
- [ ] Device connection screen shows options
- [ ] Dashboard displays sensor cards
- [ ] Charts render in History screen
- [ ] AI Insights show recommendations
- [ ] Forecast displays weather data
- [ ] Settings allow configuration changes
- [ ] Navigation between tabs works
- [ ] Pull-to-refresh functions

## 🐛 Common Issues

### Metro bundler errors
```bash
npx expo start --clear
```

### Missing dependencies
```bash
npm install --legacy-peer-deps
```

### iOS simulator issues
```bash
npx expo run:ios
```

### Android build issues
```bash
npx expo run:android
```

## 📞 Need Help?

- Check console for error messages
- Ensure all dependencies are installed
- Verify Node.js version (18+)
- Clear Metro cache if needed
- Check Expo CLI is up to date: `npm install -g @expo/cli`

---

**Ready to farm smarter with KrishiMitra! 🌱**