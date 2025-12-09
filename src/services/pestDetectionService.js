import * as ImageManipulator from 'expo-image-manipulator';
import { analyzeWithGemini, analyzeWithGoogleVision, analyzeWithDeepSeek } from './cloudVisionService';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'http://192.168.8.62:5000/predict';

const DISEASE_INFO = {
  'scab': { severity: 'medium', symptoms: ['Dark spots on leaves', 'Fruit deformation', 'Olive-green lesions'], treatment: ['Apply fungicide (Captan, Mancozeb)', 'Remove infected leaves', 'Prune for air circulation'] },
  'black rot': { severity: 'high', symptoms: ['Brown spots with concentric rings', 'Fruit mummification', 'Leaf lesions'], treatment: ['Remove mummified fruits', 'Apply fungicide', 'Prune infected branches'] },
  'cedar rust': { severity: 'medium', symptoms: ['Orange spots on leaves', 'Yellow lesions', 'Premature leaf drop'], treatment: ['Apply fungicide in spring', 'Remove nearby cedar trees', 'Use resistant varieties'] },
  'rot': { severity: 'high', symptoms: ['Brown spots', 'Fruit decay', 'Soft tissue'], treatment: ['Prune infected parts', 'Apply copper fungicide', 'Improve drainage'] },
  'rust': { severity: 'medium', symptoms: ['Orange-brown pustules', 'Leaf yellowing', 'Reduced yield'], treatment: ['Apply fungicide (Azoxystrobin)', 'Use resistant varieties', 'Remove infected leaves'] },
  'blight': { severity: 'high', symptoms: ['Brown lesions', 'Rapid wilting', 'Dark spots on stems'], treatment: ['Remove infected plants', 'Apply copper spray', 'Rotate crops'] },
  'spot': { severity: 'medium', symptoms: ['Circular spots', 'Leaf drop', 'Yellow halos'], treatment: ['Improve air circulation', 'Apply bactericide', 'Avoid overhead watering'] },
  'mildew': { severity: 'medium', symptoms: ['White powdery coating', 'Leaf curling', 'Stunted growth'], treatment: ['Apply sulfur spray', 'Increase plant spacing', 'Remove infected leaves'] },
  'gray leaf spot': { severity: 'medium', symptoms: ['Gray rectangular lesions', 'Leaf yellowing', 'Premature death'], treatment: ['Apply fungicide', 'Rotate crops', 'Use resistant hybrids'] },
  'common rust': { severity: 'medium', symptoms: ['Circular to elongate brown pustules', 'Leaf yellowing'], treatment: ['Apply fungicide if severe', 'Plant resistant hybrids', 'Monitor regularly'] },
  'northern leaf blight': { severity: 'high', symptoms: ['Long gray-green lesions', 'Leaf death', 'Yield loss'], treatment: ['Apply fungicide', 'Use resistant varieties', 'Bury crop residue'] },
  'esca': { severity: 'high', symptoms: ['Tiger stripe pattern', 'Leaf necrosis', 'Berry shrivel'], treatment: ['Prune infected wood', 'Apply wound protectants', 'Remove dead vines'] },
  'bacterial spot': { severity: 'medium', symptoms: ['Small dark spots', 'Yellow halos', 'Leaf drop'], treatment: ['Apply copper bactericide', 'Use disease-free seeds', 'Avoid overhead irrigation'] },
  'early blight': { severity: 'medium', symptoms: ['Concentric ring spots', 'Lower leaf yellowing', 'Target-like lesions'], treatment: ['Apply fungicide (Chlorothalonil)', 'Remove infected leaves', 'Mulch around plants'] },
  'late blight': { severity: 'critical', symptoms: ['Water-soaked lesions', 'White mold', 'Rapid plant death'], treatment: ['Apply fungicide immediately', 'Remove infected plants', 'Improve air circulation'] },
  'leaf scorch': { severity: 'medium', symptoms: ['Purple-brown spots', 'Leaf margins brown', 'Reduced vigor'], treatment: ['Remove infected leaves', 'Apply fungicide', 'Improve drainage'] },
  'leaf mold': { severity: 'medium', symptoms: ['Yellow spots on upper leaf', 'Olive-green mold below', 'Leaf curling'], treatment: ['Reduce humidity', 'Apply fungicide', 'Increase ventilation'] },
  'septoria': { severity: 'medium', symptoms: ['Small circular spots', 'Gray centers', 'Black specks'], treatment: ['Apply fungicide', 'Remove lower leaves', 'Mulch soil'] },
  'spider mites': { severity: 'medium', symptoms: ['Yellow stippling', 'Fine webbing', 'Leaf bronzing'], treatment: ['Apply miticide', 'Spray with water', 'Use predatory mites'] },
  'target spot': { severity: 'medium', symptoms: ['Concentric rings', 'Brown lesions', 'Defoliation'], treatment: ['Apply fungicide', 'Rotate crops', 'Remove debris'] },
  'mosaic virus': { severity: 'high', symptoms: ['Mottled leaves', 'Stunted growth', 'Distorted fruit'], treatment: ['Remove infected plants', 'Control aphids', 'Use resistant varieties'] },
  'yellow leaf curl': { severity: 'high', symptoms: ['Upward leaf curling', 'Yellowing', 'Stunted growth'], treatment: ['Control whiteflies', 'Remove infected plants', 'Use reflective mulch'] },
  'healthy': { severity: 'low', symptoms: ['No visible symptoms', 'Normal growth'], treatment: ['Continue regular care', 'Monitor regularly', 'Maintain good practices'] }
};

export async function analyzePestDisease(imageUri, mode = 'cloud') {
  const resized = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );

  // If local mode selected, use local model directly
  if (mode === 'local') {
    try {
      const result = await analyzeWithLocalModel(resized.base64);
      return { results: [result] };
    } catch (error) {
      throw new Error('Local model failed');
    }
  }

  // Cloud mode - try APIs in sequence
  const netInfo = await NetInfo.fetch();
  
  if (!netInfo.isConnected) {
    throw new Error('No internet connection. Please check your network or use local mode.');
  }

  // Try Google Cloud Vision first
  try {
    console.log('Trying Google Cloud Vision...');
    const result = await analyzeWithGoogleVision(resized.base64);
    console.log('Google Vision success');
    return { results: [formatCloudVisionResult(result, 'google_vision')] };
  } catch (error) {
    console.log('Google Vision failed:', error.message);
  }

  // Try DeepSeek second
  try {
    console.log('Trying DeepSeek...');
    const result = await analyzeWithDeepSeek(resized.base64);
    console.log('DeepSeek success');
    return { results: [formatCloudVisionResult(result, 'deepseek')] };
  } catch (error) {
    console.log('DeepSeek failed:', error.message);
  }

  // Try Gemini third
  try {
    console.log('Trying Gemini...');
    const result = await analyzeWithGemini(resized.base64);
    console.log('Gemini success');
    return { results: [formatCloudVisionResult(result, 'gemini')] };
  } catch (error) {
    console.log('Gemini failed:', error.message);
  }

  throw new Error('All cloud APIs failed. Please try local mode.')
}

function formatCloudVisionResult(cloudResult, source) {
  let key = 'healthy';
  
  if (cloudResult.detected && cloudResult.disease) {
    key = Object.keys(DISEASE_INFO).find(k => 
      cloudResult.disease.toLowerCase().includes(k)
    ) || 'spot';
  }
  
  const info = DISEASE_INFO[key];

  return {
    detected: cloudResult.detected,
    name: cloudResult.name,
    confidence: cloudResult.confidence,
    severity: info.severity,
    description: cloudResult.detected ? `AI detected plant disease` : 'Plant appears healthy with no visible diseases',
    symptoms: info.symptoms,
    treatment: info.treatment,
    rawClass: `Labels: ${cloudResult.labels.join(', ')}`,
    source: source,
    timestamp: new Date().toISOString()
  };
}

async function analyzeWithLocalModel(base64Image) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Image })
  });

  const result = await response.json();
  const parts = result.class.split('___');
  const crop = parts[0].replace(/_/g, ' ').replace(/\(|\)/g, '');
  const disease = parts[1] || 'healthy';
  const isHealthy = disease.toLowerCase().includes('healthy');
  
  const diseaseLower = disease.toLowerCase();
  const key = Object.keys(DISEASE_INFO).find(k => diseaseLower.includes(k)) || 'healthy';
  const info = DISEASE_INFO[key];

  return {
    detected: !isHealthy,
    name: isHealthy ? `Healthy ${crop}` : `${crop} - ${disease.replace(/_/g, ' ').trim()}`,
    confidence: result.confidence,
    severity: info.severity,
    description: isHealthy ? 'Plant appears healthy with no visible diseases' : `Detected ${disease.replace(/_/g, ' ').trim()}`,
    symptoms: info.symptoms,
    treatment: info.treatment,
    rawClass: result.class,
    source: 'local_model',
    timestamp: new Date().toISOString()
  };
}
