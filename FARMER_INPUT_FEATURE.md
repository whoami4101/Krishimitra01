# Farmer Input Feature

## Overview
Added a new "Farmer Input" tab to the navigation where farmers can upload images and add details about their crops and observations.

## Changes Made

### 1. New Screen Created
- **File**: `src/screens/FarmerInputScreen.js`
- **Features**:
  - Image upload from gallery
  - Take photo with camera
  - Form fields for crop details
  - Submit functionality

### 2. Navigation Updated
- **File**: `App.js`
- Added FarmerInputScreen to bottom tab navigation
- Icon: add-circle (Ionicons)
- Position: Between Forecast and Settings tabs

### 3. Dependencies Added
- **Package**: `expo-image-picker` (~16.0.5)
- Required for image selection and camera functionality

## Installation

Run the following command to install the new dependency:
```bash
npm install
```

## Form Fields

1. **Upload Image*** (Required)
   - Take photo with camera
   - Choose from gallery
   - Preview selected image

2. **Crop Type*** (Required)
   - Text input for crop name

3. **Location** (Optional)
   - Field location or area

4. **Issue/Observation*** (Required)
   - Multi-line text area
   - Describe problems or observations

5. **Additional Notes** (Optional)
   - Multi-line text area
   - Any extra information

## Usage

1. Navigate to "Farmer Input" tab
2. Upload an image (camera or gallery)
3. Fill in required fields (marked with *)
4. Add optional details
5. Tap "Submit" button

## Validation

- Alerts user if required fields are missing
- Success message on successful submission
- Form resets after submission

## Future Enhancements

- Save submissions to local storage or backend
- View history of submitted inputs
- AI analysis of uploaded images
- Integration with AI Insights screen
- Location auto-detection using GPS

---

**Tab Order**: Dashboard → History → AI Insights → Forecast → **Farmer Input** → Settings
