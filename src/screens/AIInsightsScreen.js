import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { fetchSatelliteData } from '../services/satelliteService';

export default function AIInsightsScreen() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('insights');
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'satellite') {
      loadSatelliteData();
    }
  }, [activeTab]);

  const loadSatelliteData = async () => {
    setLoading(true);
    const data = await fetchSatelliteData('69372b73a049de85f04b3e87'); // Replace with actual polygon ID
    setSatelliteData(data);
    setLoading(false);
  };
  const insights = [
    {
      id: 1,
      status: 'good',
      title: 'Soil Moisture Level',
      message: 'Moisture is 45% - within safe range for wheat crop',
      recommendation: 'Continue current irrigation schedule',
      icon: 'water',
      color: '#4CAF50',
    },
    {
      id: 2,
      status: 'warning',
      title: 'Yield Prediction',
      message: 'Slightly below average due to recent low rainfall',
      recommendation: 'Consider supplemental irrigation in next 2 days',
      icon: 'trending-down',
      color: '#FF9800',
    },
    {
      id: 5,
      status: 'good',
      title: 'pH Level',
      message: 'Soil pH is 6.8 - optimal for wheat cultivation',
      recommendation: 'pH level is within ideal range, no adjustment needed',
      icon: 'flask',
      color: '#4CAF50',
    },
    {
      id: 6,
      status: 'good',
      title: 'Nitrogen (N)',
      message: 'Nitrogen level at 85 ppm - adequate for wheat growth',
      recommendation: 'Maintain current nitrogen application schedule',
      icon: 'leaf',
      color: '#4CAF50',
    },
    {
      id: 7,
      status: 'warning',
      title: 'Phosphorus (P)',
      message: 'Phosphorus level at 42 ppm - slightly below optimal',
      recommendation: 'Consider phosphorus-rich fertilizer application',
      icon: 'flash',
      color: '#FF9800',
    },
    {
      id: 8,
      status: 'good',
      title: 'Potassium (K)',
      message: 'Potassium level at 68 ppm - within optimal range',
      recommendation: 'Current potassium levels are sufficient',
      icon: 'fitness',
      color: '#4CAF50',
    },
    {
      id: 3,
      status: 'critical',
      title: 'Pest Risk Alert',
      message: 'High humidity detected - increased pest risk',
      recommendation: 'Apply preventive pest control measures',
      icon: 'bug',
      color: '#F44336',
    },
    {
      id: 4,
      status: 'good',
      title: 'Growth Conditions',
      message: 'Temperature and light conditions are optimal',
      recommendation: 'No action required - conditions are favorable',
      icon: 'sunny',
      color: '#4CAF50',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'alert-circle';
      default:
        return 'information-circle';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('aiInsights')}</Text>
        <Text style={styles.subtitle}>{t('smartRecommendations')}</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'insights' && styles.activeTab]}
            onPress={() => setActiveTab('insights')}
          >
            <Ionicons name="bulb" size={20} color={activeTab === 'insights' ? '#4CAF50' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'insights' && styles.activeTabText]}>AI Insights</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'satellite' && styles.activeTab]}
            onPress={() => setActiveTab('satellite')}
          >
            <Ionicons name="satellite" size={20} color={activeTab === 'satellite' ? '#4CAF50' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'satellite' && styles.activeTabText]}>Satellite Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'insights' ? (
        <ScrollView style={styles.content}>

          <View style={styles.insightsList}>
            {insights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={insight.icon} size={24} color={insight.color} />
                  </View>
                  <View style={styles.statusContainer}>
                    <Ionicons
                      name={getStatusIcon(insight.status)}
                      size={20}
                      color={insight.color}
                    />
                  </View>
                </View>
                
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightMessage}>{insight.message}</Text>
                
                <View style={styles.recommendationContainer}>
                  <Text style={styles.recommendationLabel}>{t('recommendation')}:</Text>
                  <Text style={styles.recommendationText}>{insight.recommendation}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
            </View>
          ) : satelliteData ? (
            <View style={styles.satelliteContainer}>
              <View style={styles.satelliteCard}>
                <View style={styles.cardHeader}>
                  <Ionicons name="leaf" size={24} color="#4CAF50" />
                  <Text style={styles.satelliteTitle}>Crop Health (NDVI)</Text>
                </View>
                <Text style={styles.satelliteValue}>{satelliteData.ndvi.toFixed(3)}</Text>
                <Text style={styles.satelliteStatus}>{satelliteData.cropHealth}</Text>
              </View>

              <View style={styles.satelliteCard}>
                <View style={styles.cardHeader}>
                  <Ionicons name="analytics" size={24} color="#2196F3" />
                  <Text style={styles.satelliteTitle}>Canopy Cover</Text>
                </View>
                <Text style={styles.satelliteValue}>{satelliteData.canopyCover}%</Text>
              </View>

              {satelliteData.imageUrl && (
                <View style={styles.satelliteCard}>
                  <Text style={styles.satelliteTitle}>Satellite Image</Text>
                  <Image source={{ uri: satelliteData.imageUrl }} style={styles.satelliteImage} />
                  <Text style={styles.lastUpdated}>Last Updated: {satelliteData.lastUpdated}</Text>
                </View>
              )}
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  insightsList: {
    padding: 15,
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    padding: 5,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  insightMessage: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  recommendationContainer: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
  },
  recommendationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  satelliteContainer: {
    padding: 15,
  },
  satelliteCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  satelliteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  satelliteValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 15,
  },
  satelliteStatus: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  satelliteImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});