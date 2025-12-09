#!/bin/bash

# Install required dependencies for Pest Detection feature
echo "Installing dependencies for Pest Detection with MobileNetV2..."

npm install @tensorflow/tfjs @tensorflow/tfjs-react-native @tensorflow-models/mobilenet
npm install expo-file-system expo-gl expo-gl-cpp

echo "Installation complete!"
echo "Note: Run 'npx expo install expo-file-system expo-gl' if you encounter any issues"
