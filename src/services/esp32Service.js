// ESP32 WiFi Service
const ESP32_IP = '192.168.4.1';
const API_ENDPOINTS = [
  `http://${ESP32_IP}/api/sensor-data`,
];

const TIMEOUT = 2000;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 500;

export const fetchESP32Data = async () => {
  // Try each endpoint with retries
  for (const endpoint of API_ENDPOINTS) {
    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          
          // Map ESP32 data to app format
          return {
            temperature: data.temperature || data.temp || 0,
            humidity: data.humidity || data.hum || 0,
            soilMoisture: data.soilMoisture || data.moisture || data.soil || 0,
            lightIntensity: 0,
            phLevel: 0,
            nitrogen: 0,
            phosphorus: 0,
            potassium: 0,
            connected: true,
          };
        }
      } catch (error) {
        if (attempt < RETRY_ATTEMPTS) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }
  }
  
  // Return 0 values if not connected to ESP32
  return {
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    lightIntensity: 0,
    phLevel: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    connected: false,
  };
};

export const checkESP32Connection = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    
    const response = await fetch(API_ENDPOINTS[0], {
      signal: controller.signal,
      headers: { 'Cache-Control': 'no-cache' },
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};
