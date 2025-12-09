import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

export default function CropSelectionScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { selectedCrop, onSelect } = route.params;

  const crops = [
    { key: 'wheat', icon: 'leaf', color: '#F4A460' },
    { key: 'rice', icon: 'leaf', color: '#90EE90' },
    { key: 'maize', icon: 'leaf', color: '#FFD700' },
    { key: 'cotton', icon: 'leaf', color: '#FFFFFF' },
    { key: 'sugarcane', icon: 'leaf', color: '#98FB98' },
    { key: 'soybean', icon: 'leaf', color: '#DEB887' },
    { key: 'barley', icon: 'leaf', color: '#D2B48C' },
    { key: 'pulses', icon: 'leaf', color: '#CD853F' },
    { key: 'groundnut', icon: 'leaf', color: '#F5DEB3' },
    { key: 'sunflower', icon: 'sunny', color: '#FFD700' },
    { key: 'mustard', icon: 'leaf', color: '#FFDB58' },
    { key: 'potato', icon: 'leaf', color: '#D2691E' },
    { key: 'tomato', icon: 'leaf', color: '#FF6347' },
    { key: 'onion', icon: 'leaf', color: '#E6E6FA' },
    { key: 'chilli', icon: 'flame', color: '#FF4500' },
  ];

  const handleSelect = (cropKey) => {
    onSelect(cropKey);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('selectCropType')}</Text>
      </View>

      <ScrollView style={styles.list}>
        {crops.map((crop, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cropItem}
            onPress={() => handleSelect(crop.key)}
          >
            <View style={styles.cropInfo}>
              <View style={[styles.iconContainer, { backgroundColor: crop.color }]}>
                <Ionicons name={crop.icon} size={24} color="#333" />
              </View>
              <Text style={styles.cropName}>{t(crop.key)}</Text>
            </View>
            {selectedCrop === crop.key && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  cropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cropName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
