// OpenWeather Agro API Service
const AGRO_API_KEY = 'c48ecd17a906c82b61a1e53dd4888d43'; // Replace with your API key
const AGRO_BASE_URL = 'https://api.agromonitoring.com/agro/1.0';

export const fetchSatelliteData = async (polygonId) => {
  try {
    // Fetch NDVI data
    const ndviResponse = await fetch(
      `${AGRO_BASE_URL}/ndvi/history?polyid=${polygonId}&start=${Math.floor(Date.now() / 1000) - 2592000}&end=${Math.floor(Date.now() / 1000)}&appid=${AGRO_API_KEY}`
    );
    const ndviData = await ndviResponse.json();

    // Fetch latest satellite image
    const imageResponse = await fetch(
      `${AGRO_BASE_URL}/image/search?polyid=${polygonId}&start=${Math.floor(Date.now() / 1000) - 604800}&end=${Math.floor(Date.now() / 1000)}&appid=${AGRO_API_KEY}`
    );
    const imageData = await imageResponse.json();

    const latestNdvi = ndviData[ndviData.length - 1] || {};
    const latestImage = imageData[0] || {};

    return {
      ndvi: latestNdvi.data?.mean || 0,
      cropHealth: getCropHealthStatus(latestNdvi.data?.mean || 0),
      canopyCover: calculateCanopyCover(latestNdvi.data?.mean || 0),
      imageUrl: latestImage.image?.truecolor || null,
      lastUpdated: latestImage.dt ? new Date(latestImage.dt * 1000).toLocaleDateString() : 'N/A',
    };
  } catch (error) {
    console.error('Satellite data fetch error:', error);
    return {
      ndvi: 0,
      cropHealth: 'Unknown',
      canopyCover: 0,
      imageUrl: null,
      lastUpdated: 'N/A',
    };
  }
};

const getCropHealthStatus = (ndvi) => {
  if (ndvi >= 0.6) return 'Excellent';
  if (ndvi >= 0.4) return 'Good';
  if (ndvi >= 0.2) return 'Moderate';
  return 'Poor';
};

const calculateCanopyCover = (ndvi) => {
  return Math.min(Math.max((ndvi * 100), 0), 100).toFixed(1);
};
