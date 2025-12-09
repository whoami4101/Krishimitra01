const GOOGLE_VISION_API_KEY = 'AIzaSyBwOQlJm8nKtuhm4jj-kaHRG8DKnx_LKUM';
const GOOGLE_VISION_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;
const GEMINI_API_KEY = 'AIzaSyBkISvHGaJdHc88VlR4BVDcIE08as_OTSE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const DISEASE_PATTERNS = {
  'apple_scab': ['apple', 'scab'],
  'apple_black_rot': ['apple', 'black rot', 'rot'],
  'apple_cedar_rust': ['apple', 'cedar', 'rust'],
  'cherry_powdery_mildew': ['cherry', 'mildew', 'powdery'],
  'corn_gray_leaf_spot': ['corn', 'maize', 'gray', 'spot'],
  'corn_common_rust': ['corn', 'maize', 'rust'],
  'corn_northern_leaf_blight': ['corn', 'maize', 'blight', 'northern'],
  'grape_black_rot': ['grape', 'black rot', 'rot'],
  'grape_esca': ['grape', 'esca', 'black measles'],
  'grape_leaf_blight': ['grape', 'blight'],
  'peach_bacterial_spot': ['peach', 'bacterial', 'spot'],
  'pepper_bacterial_spot': ['pepper', 'bacterial', 'spot'],
  'potato_early_blight': ['potato', 'early blight', 'blight'],
  'potato_late_blight': ['potato', 'late blight', 'blight'],
  'strawberry_leaf_scorch': ['strawberry', 'scorch', 'leaf'],
  'tomato_bacterial_spot': ['tomato', 'bacterial', 'spot'],
  'tomato_early_blight': ['tomato', 'early blight', 'blight'],
  'tomato_late_blight': ['tomato', 'late blight', 'blight'],
  'tomato_leaf_mold': ['tomato', 'mold', 'leaf'],
  'tomato_septoria_leaf_spot': ['tomato', 'septoria', 'spot'],
  'tomato_spider_mites': ['tomato', 'spider', 'mite'],
  'tomato_target_spot': ['tomato', 'target', 'spot'],
  'tomato_mosaic_virus': ['tomato', 'mosaic', 'virus'],
  'tomato_yellow_leaf_curl_virus': ['tomato', 'yellow', 'curl', 'virus']
};

export async function analyzeWithGoogleVision(base64Image) {
  const requestBody = {
    requests: [{
      image: { content: base64Image },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 10 },
        { type: 'WEB_DETECTION', maxResults: 10 }
      ]
    }]
  };

  const response = await fetch(GOOGLE_VISION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) throw new Error('Google Vision API failed');
  
  const data = await response.json();
  return parseGoogleVisionResponse(data.responses[0]);
}

export async function analyzeWithGemini(base64Image) {
  const requestBody = {
    contents: [{
      parts: [
        { text: 'Analyze this plant leaf image and identify: 1) Crop type (Apple/Blueberry/Cherry/Corn/Grape/Orange/Peach/Pepper/Potato/Raspberry/Soybean/Squash/Strawberry/Tomato), 2) Disease name if any (scab/black rot/rust/blight/spot/mildew/mosaic virus/etc), 3) Is it healthy or diseased? Respond ONLY in JSON format: {"crop":"name","disease":"name or healthy","confidence":85}' },
        { inline_data: { mime_type: 'image/jpeg', data: base64Image } }
      ]
    }]
  };

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) throw new Error('Gemini API failed');
  
  const data = await response.json();
  return parseGeminiResponse(data);
}

function parseGoogleVisionResponse(response) {
  const labels = response.labelAnnotations || [];
  const webEntities = response.webDetection?.webEntities || [];
  
  const allLabels = [...labels.map(l => l.description.toLowerCase()), ...webEntities.map(e => e.description.toLowerCase())];
  
  const cropTypes = ['apple', 'cherry', 'corn', 'maize', 'grape', 'peach', 'pepper', 'potato', 'strawberry', 'tomato', 'blueberry', 'orange', 'raspberry', 'soybean', 'squash'];
  const diseaseKeywords = ['disease', 'blight', 'rust', 'spot', 'rot', 'mildew', 'scab', 'virus', 'mold'];
  
  let crop = cropTypes.find(c => allLabels.some(l => l.includes(c))) || 'Plant';
  let hasDisease = allLabels.some(l => diseaseKeywords.some(d => l.includes(d)));
  let disease = hasDisease ? allLabels.find(l => diseaseKeywords.some(d => l.includes(d))) || 'Unknown disease' : 'healthy';
  
  return {
    detected: hasDisease,
    name: hasDisease ? `${crop} - ${disease}` : `Healthy ${crop}`,
    confidence: labels[0]?.score ? Math.round(labels[0].score * 100) : 70,
    labels: labels.slice(0, 5).map(l => l.description),
    crop: crop,
    disease: disease
  };
}

function parseGeminiResponse(data) {
  const content = data.candidates[0].content.parts[0].text;
  const jsonMatch = content.match(/\{[\s\S]*?\}/);
  const result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  
  if (!result) throw new Error('Invalid response');
  
  const crop = result.crop || 'Plant';
  const disease = result.disease || 'healthy';
  const confidence = result.confidence || 75;
  const isHealthy = disease.toLowerCase().includes('healthy');
  
  return {
    detected: !isHealthy,
    name: isHealthy ? `Healthy ${crop}` : `${crop} - ${disease}`,
    confidence: confidence,
    labels: [crop, disease],
    crop: crop.toLowerCase(),
    disease: disease.toLowerCase()
  };
}
