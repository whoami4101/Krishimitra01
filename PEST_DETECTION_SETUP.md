# Pest & Disease Detection Setup Guide

## Overview
The Pest Detection feature uses MobileNetV2 deep learning model to analyze crop images and identify pests and diseases.

## Installation

### 1. Install Dependencies
```bash
chmod +x install-dependencies.sh
./install-dependencies.sh
```

Or manually:
```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native @tensorflow-models/mobilenet
npm install expo-file-system expo-gl expo-gl-cpp
```

### 2. Update package.json
Add to dependencies:
```json
"@tensorflow/tfjs": "^4.11.0",
"@tensorflow/tfjs-react-native": "^0.8.0",
"@tensorflow-models/mobilenet": "^2.1.0",
"expo-file-system": "~17.0.1",
"expo-gl": "~15.0.2",
"expo-gl-cpp": "~15.0.2"
```

## Features

### Image Input
- **Camera**: Take live photos of crops
- **Gallery**: Select existing images

### AI Analysis
- Detects 6 categories:
  1. Healthy Leaf
  2. Aphid Infestation
  3. Leaf Blight
  4. Powdery Mildew
  5. Caterpillar Damage
  6. Rust Disease

### Results Display
- Confidence score
- Severity level (Low/Medium/High)
- Symptoms list
- Treatment recommendations

## Usage

1. Navigate to **Farmer Input** tab
2. Click "Take Photo" or "Choose from Gallery"
3. Select/capture crop image
4. AI automatically analyzes the image
5. View results with treatment recommendations

## Customization

### Add New Pest/Disease Classes
Edit `src/services/pestDetectionService.js`:

```javascript
const PEST_DISEASE_CLASSES = {
  7: { 
    name: 'New Disease', 
    detected: true, 
    severity: 'high',
    description: 'Description here',
    symptoms: ['Symptom 1', 'Symptom 2'],
    treatment: ['Treatment 1', 'Treatment 2']
  }
};
```

### Train Custom Model
For production use, train a custom MobileNetV2 model:

1. Collect labeled crop disease images
2. Use TensorFlow/Keras to train:
```python
from tensorflow.keras.applications import MobileNetV2
base_model = MobileNetV2(weights='imagenet', include_top=False)
# Add custom classification layers
# Train on your dataset
```

3. Convert to TensorFlow.js format:
```bash
tensorflowjs_converter --input_format=keras model.h5 web_model/
```

4. Load custom model in app:
```javascript
const model = await tf.loadLayersModel('path/to/model.json');
```

## Permissions Required

### Android (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### iOS (ios/YourApp/Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to analyze crop health</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need gallery access to analyze crop images</string>
```

## Performance Tips

1. **Image Size**: Resize images to 224x224 for faster processing
2. **Model Caching**: Model loads once and stays in memory
3. **Offline Support**: Model works without internet after initial load

## Troubleshooting

### Issue: Model not loading
```bash
npm install @tensorflow/tfjs-backend-webgl
```

### Issue: Camera permission denied
Check app permissions in device settings

### Issue: Out of memory
Reduce image quality in ImagePicker options:
```javascript
quality: 0.5  // Instead of 1.0
```

## Future Enhancements

- [ ] Multi-language support for disease names
- [ ] Offline model storage
- [ ] History of analyzed images
- [ ] Share results with experts
- [ ] Geolocation tagging
- [ ] Batch image analysis

## Support

For issues or questions, refer to:
- TensorFlow.js: https://www.tensorflow.org/js
- Expo ImagePicker: https://docs.expo.dev/versions/latest/sdk/imagepicker/
