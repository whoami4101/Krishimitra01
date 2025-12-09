import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { analyzePestDisease } from '../services/pestDetectionService';

export default function FarmerInputScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant gallery access');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
      analyzeImage(pickerResult.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera access');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
      analyzeImage(pickerResult.assets[0].uri);
    }
  };

  const analyzeImage = async (uri) => {
    setLoading(true);
    setResults([]);
    try {
      const analysis = await analyzePestDisease(uri);
      setResults(analysis.results || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image');
    }
    setLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pest & Disease Detection</Text>
        <Text style={styles.subtitle}>AI-powered crop health analysis</Text>
      </View>

      <ScrollView style={styles.content}>
        {!image ? (
          <View style={styles.uploadContainer}>
            <Ionicons name="leaf-outline" size={80} color="#4CAF50" />
            <Text style={styles.uploadText}>Upload or capture a plant image</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={pickImage}>
                <Ionicons name="images" size={24} color="#4CAF50" />
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Analyzing image...</Text>
              </View>
            ) : results.length > 0 ? (
              <View style={styles.analysisContainer}>
                {results.map((result, index) => (
                  <View key={index} style={[styles.resultCard, { borderLeftColor: getSeverityColor(result.severity) }]}>
                    <View style={styles.resultHeader}>
                      <Ionicons name={result.detected ? "alert-circle" : "checkmark-circle"} 
                                size={32} color={getSeverityColor(result.severity)} />
                      <Text style={styles.resultTitle}>{result.name}</Text>
                    </View>
                    
                    <Text style={styles.confidence}>Confidence: {result.confidence}%</Text>
                    {result.source && (
                      <View style={styles.sourceTag}>
                        <Ionicons name={result.source === 'local_model' ? 'phone-portrait' : result.source === 'gemini' ? 'sparkles' : 'cloud'} size={12} color="#666" />
                        <Text style={styles.sourceText}>{result.source === 'local_model' ? 'Local Model' : result.source === 'gemini' ? 'Gemini AI' : 'Google Vision'}</Text>
                      </View>
                    )}
                    {result.rawClass && <Text style={styles.debugInfo}>Class: {result.rawClass}</Text>}
                    <Text style={styles.description}>{result.description}</Text>
                    
                    {result.detected && (
                      <>
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Symptoms:</Text>
                          {result.symptoms.map((symptom, idx) => (
                            <Text key={idx} style={styles.listItem}>• {symptom}</Text>
                          ))}
                        </View>
                        
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Treatment:</Text>
                          {result.treatment.map((step, idx) => (
                            <Text key={idx} style={styles.listItem}>• {step}</Text>
                          ))}
                        </View>
                      </>
                    )}
                  </View>
                ))}
              </View>
            ) : null}
            
            <TouchableOpacity style={styles.retryButton} onPress={() => { setImage(null); setResults([]); }}>
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.retryText}>Analyze Another Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: 'white', padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  content: { flex: 1 },
  uploadContainer: { alignItems: 'center', padding: 40, marginTop: 60 },
  uploadText: { fontSize: 18, color: '#666', marginTop: 20, marginBottom: 30 },
  buttonContainer: { width: '100%', gap: 15 },
  button: { backgroundColor: '#4CAF50', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 10, gap: 10 },
  secondaryButton: { backgroundColor: 'white', borderWidth: 2, borderColor: '#4CAF50' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  secondaryButtonText: { color: '#4CAF50' },
  resultContainer: { padding: 15 },
  image: { width: '100%', height: 300, borderRadius: 15, marginBottom: 20 },
  loadingContainer: { alignItems: 'center', padding: 30 },
  loadingText: { marginTop: 10, color: '#666' },
  analysisContainer: { marginBottom: 20 },
  resultCard: { backgroundColor: 'white', borderRadius: 15, padding: 20, borderLeftWidth: 4, marginBottom: 15 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 10 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', flex: 1 },
  confidence: { fontSize: 14, color: '#666', marginBottom: 10 },
  sourceTag: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#F5F5F5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, alignSelf: 'flex-start', marginBottom: 10 },
  sourceText: { fontSize: 12, color: '#666', fontWeight: '500' },
  debugInfo: { fontSize: 12, color: '#999', marginBottom: 5, fontFamily: 'monospace' },
  description: { fontSize: 16, color: '#333', marginBottom: 15 },
  section: { marginTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  listItem: { fontSize: 14, color: '#666', marginBottom: 5, paddingLeft: 10 },
  retryButton: { backgroundColor: '#4CAF50', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 10, gap: 10 },
  retryText: { color: 'white', fontSize: 16, fontWeight: '600' }
});
