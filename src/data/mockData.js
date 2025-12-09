// Mock data for testing the KrishiMitra app

export const sensorData = {
  soilMoisture: 45,
  temperature: 28,
  humidity: 65,
  lightIntensity: 75,
  nitrogen: 85,
  phosphorus: 42,
  potassium: 68,
  phLevel: 6.8,
  lastUpdated: new Date().toISOString(),
};

export const historicalData = {
  soilMoisture: [45, 42, 38, 41, 47, 52, 49],
  temperature: [25, 27, 29, 28, 26, 24, 25],
  humidity: [65, 68, 72, 70, 63, 60, 65],
  lightIntensity: [75, 78, 82, 80, 77, 74, 76],
  nitrogen: [85, 82, 88, 86, 84, 87, 85],
  phosphorus: [42, 45, 40, 43, 41, 44, 42],
  potassium: [68, 70, 65, 67, 69, 66, 68],
  phLevel: [6.8, 6.9, 6.7, 6.8, 6.9, 6.8, 6.8],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

export const aiInsights = [
  {
    id: 1,
    status: 'good',
    title: 'Soil Moisture Level',
    message: 'Moisture is 45% - within safe range for wheat crop',
    recommendation: 'Continue current irrigation schedule',
    icon: 'water',
    color: '#4CAF50',
  },
  {
    id: 2,
    status: 'warning',
    title: 'Yield Prediction',
    message: 'Slightly below average due to recent low rainfall',
    recommendation: 'Consider supplemental irrigation in next 2 days',
    icon: 'trending-down',
    color: '#FF9800',
  },
];

export const weatherForecast = [
  { day: 'Today', temp: '28°C', humidity: '65%', rain: '10%', icon: 'partly-sunny' },
  { day: 'Tomorrow', temp: '30°C', humidity: '70%', rain: '40%', icon: 'cloudy' },
  { day: 'Day 3', temp: '26°C', humidity: '80%', rain: '80%', icon: 'rainy' },
  { day: 'Day 4', temp: '25°C', humidity: '75%', rain: '60%', icon: 'rainy' },
  { day: 'Day 5', temp: '29°C', humidity: '60%', rain: '20%', icon: 'sunny' },
];

export const pestAlerts = [
  {
    id: 1,
    pest: 'Aphids',
    riskLevel: 'Medium',
    color: '#FF9800',
    prevention: 'Apply neem oil spray in early morning',
  },
  {
    id: 2,
    pest: 'Fungal Disease',
    riskLevel: 'High',
    color: '#F44336',
    prevention: 'Ensure proper drainage and air circulation',
  },
  {
    id: 3,
    pest: 'Caterpillars',
    riskLevel: 'Low',
    color: '#4CAF50',
    prevention: 'Regular monitoring recommended',
  },
];

export const cropTypes = [
  'Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Barley', 'Millet'
];

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
];