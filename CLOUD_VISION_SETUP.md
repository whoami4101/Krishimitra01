# Cloud Vision API Integration

## Overview
The app now uses **Google Cloud Vision API** as the primary method for pest and disease detection, with automatic fallback to the local TensorFlow model when there's no network connection.

## How It Works

### Detection Flow:
1. **Network Check**: App checks internet connectivity
2. **Primary**: If online → Uses Cloud Vision API
3. **Fallback**: If offline → Uses local TensorFlow model

### API Configuration
- **API Key**: AIzaSyBwOQlJm8nKtuhm4jj-kaHRG8DKnx_LKUM
- **Service**: Google Cloud Vision API
- **Features Used**:
  - Label Detection (identifies objects/conditions)
  - Image Properties (analyzes colors/quality)
  - Web Detection (finds similar images)

## Files Modified

1. **src/services/cloudVisionService.js** (NEW)
   - Cloud Vision API integration
   - Response parsing for disease detection

2. **src/services/pestDetectionService.js**
   - Network detection logic
   - Primary/fallback switching
   - Result formatting

3. **src/screens/FarmerInputScreen.js**
   - Source indicator (Cloud/Local)
   - UI updates

## Usage

1. Start backend (for fallback):
   ```bash
   ./START_BACKEND.sh
   ```

2. Start app:
   ```bash
   npm start
   ```

3. Use Disease Detection:
   - Go to **Farmer Input** tab
   - Take/upload plant photo
   - See detection source badge (Cloud Vision API or Local Model)

## Benefits

✅ **Cloud Vision API** (when online):
- More accurate detection
- Broader disease recognition
- No local model size constraints
- Regular updates from Google

✅ **Local Model** (when offline):
- Works without internet
- Fast processing
- Privacy (data stays local)
- 38 disease classes supported

## API Key Security

⚠️ **Important**: For production, move API key to:
- Environment variables
- Secure backend endpoint
- Firebase Remote Config

Never commit API keys to public repositories!