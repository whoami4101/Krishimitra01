import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SensorCard from '../components/SensorCard';
import InsightCard from '../components/InsightCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchESP32Data } from '../services/esp32Service';

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 65,
    lightIntensity: 75,
    nitrogen: 85,
    phosphorus: 42,
    potassium: 68,
    phLevel: 6.8,
    connected: false,
  });

  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Soil moisture at 45% - Consider irrigation',
      icon: 'water',
      color: '#FF9800',
    },
    {
      id: 2,
      type: 'good',
      message: 'Temperature normal - No action required',
      icon: 'thermometer',
      color: '#4CAF50',
    },
  ]);

  const onRefresh = async () => {
    try {
      const data = await fetchESP32Data();
      setSensorData(prevData => ({
        ...data,
        connected: data.connected || prevData.connected
      }));
      
      // Update insights based on real data
      const newInsights = [];
      
      if (data.soilMoisture < 30) {
        newInsights.push({
          id: 1,
          type: 'critical',
          message: `Soil moisture at ${data.soilMoisture}% - Irrigation needed urgently`,
          icon: 'water',
          color: '#F44336',
        });
      } else if (data.soilMoisture < 50) {
        newInsights.push({
          id: 1,
          type: 'warning',
          message: `Soil moisture at ${data.soilMoisture}% - Consider irrigation`,
          icon: 'water',
          color: '#FF9800',
        });
      } else {
        newInsights.push({
          id: 1,
          type: 'good',
          message: `Soil moisture at ${data.soilMoisture}% - Optimal level`,
          icon: 'water',
          color: '#4CAF50',
        });
      }
      
      if (data.temperature > 35) {
        newInsights.push({
          id: 2,
          type: 'warning',
          message: `Temperature at ${data.temperature}°C - High temperature alert`,
          icon: 'thermometer',
          color: '#FF9800',
        });
      } else {
        newInsights.push({
          id: 2,
          type: 'good',
          message: `Temperature at ${data.temperature}°C - Normal range`,
          icon: 'thermometer',
          color: '#4CAF50',
        });
      }
      
      setInsights(newInsights);
    } catch (error) {
      console.log('Using simulated data');
    }
  };

  useEffect(() => {
    onRefresh();
    const interval = setInterval(onRefresh, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.farmName}>{t('myFarm')}</Text>
            <Text style={styles.cropType}>{t('wheatCrop')}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: sensorData.connected ? '#4CAF50' : '#F44336' }]}>
            <View style={[styles.statusDot, { backgroundColor: sensorData.connected ? '#fff' : '#fff' }]} />
            <Text style={styles.statusText}>{sensorData.connected ? 'Connected' : 'Disconnected'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sensorGrid}>
        <SensorCard
          title={t('soilMoisture')}
          value={`${sensorData.soilMoisture}%`}
          icon="water"
          color="#2196F3"
        />
        <SensorCard
          title={t('temperature')}
          value={`${sensorData.temperature}°C`}
          icon="thermometer"
          color="#FF5722"
        />
        <SensorCard
          title={t('humidity')}
          value={`${sensorData.humidity}%`}
          icon="cloud"
          color="#9C27B0"
        />
        <SensorCard
          title={t('lightIntensity')}
          value={`${sensorData.lightIntensity}%`}
          icon="sunny"
          color="#FFC107"
          unavailable={true}
        />
        <SensorCard
          title={t('phLevel')}
          value={sensorData.phLevel || '0'}
          icon="flask"
          color="#9C27B0"
          unavailable={true}
        />
        <SensorCard
          title={t('nitrogen')}
          value={`${sensorData.nitrogen} ppm`}
          icon="leaf"
          color="#4CAF50"
          unavailable={true}
        />
        <SensorCard
          title={t('phosphorus')}
          value={`${sensorData.phosphorus} ppm`}
          icon="flash"
          color="#FF9800"
          unavailable={true}
        />
        <SensorCard
          title={t('potassium')}
          value={`${sensorData.potassium} ppm`}
          icon="fitness"
          color="#795548"
          unavailable={true}
        />
      </View>

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>{t('quickInsights')}</Text>
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cropType: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  insightsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});