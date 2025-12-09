import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { weatherService } from '../services/weatherService';
import { getLocation } from '../config/weather.config';
import { useLanguage } from '../context/LanguageContext';

export default function ForecastScreen() {
  const { t } = useLanguage();
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState('');

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': 'sunny', '01n': 'moon',
      '02d': 'partly-sunny', '02n': 'cloudy-night',
      '03d': 'cloudy', '03n': 'cloudy',
      '04d': 'cloudy', '04n': 'cloudy',
      '09d': 'rainy', '09n': 'rainy',
      '10d': 'rainy', '10n': 'rainy',
      '11d': 'thunderstorm', '11n': 'thunderstorm',
      '13d': 'snow', '13n': 'snow',
      '50d': 'cloudy', '50n': 'cloudy'
    };
    return iconMap[iconCode] || 'partly-sunny';
  };

  const fetchWeather = async () => {
    try {
      const { lat, lon, name } = await getLocation();
      setLocationName(name);
      const forecast = await weatherService.getForecast(lat, lon);
      const formattedForecast = forecast.map((day, index) => ({
        day: index === 0 ? t('today') : index === 1 ? t('tomorrow') : `${t('day')} ${index + 1}`,
        temp: `${day.temp}°C`,
        tempRange: `${day.tempMin}°-${day.tempMax}°C`,
        humidity: `${day.humidity}%`,
        rain: `${day.rainfall}mm`,
        wind: `${day.windSpeed} m/s`,
        icon: getWeatherIcon(day.icon),
        description: day.description
      }));
      setWeatherForecast(formattedForecast);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  const pestAlerts = [
    {
      id: 1,
      pest: 'Aphids',
      riskLevel: 'Medium',
      color: '#FF9800',
      prevention: 'Apply neem oil spray in early morning',
    },
    {
      id: 2,
      pest: 'Fungal Disease',
      riskLevel: 'High',
      color: '#F44336',
      prevention: 'Ensure proper drainage and air circulation',
    },
    {
      id: 3,
      pest: 'Caterpillars',
      riskLevel: 'Low',
      color: '#4CAF50',
      prevention: 'Regular monitoring recommended',
    },
  ];

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{t('loadingWeather')}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('weatherPestForecast')}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#4CAF50" />
          <Text style={styles.locationText}>{locationName}</Text>
        </View>
        <Text style={styles.subtitle}>{t('fiveDayPredictions')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('weatherForecast')}</Text>
        {weatherForecast.map((weather, index) => (
          <View key={index} style={styles.weatherCard}>
            <View style={styles.weatherDay}>
              <Text style={styles.dayText}>{weather.day}</Text>
              <Ionicons name={weather.icon} size={32} color="#4CAF50" />
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherItem}>
                <Ionicons name="thermometer" size={16} color="#FF5722" />
                <Text style={styles.weatherText}>{weather.temp}</Text>
              </View>
              <View style={styles.weatherItem}>
                <Ionicons name="water" size={16} color="#2196F3" />
                <Text style={styles.weatherText}>{weather.humidity}</Text>
              </View>
              <View style={styles.weatherItem}>
                <Ionicons name="rainy" size={16} color="#9C27B0" />
                <Text style={styles.weatherText}>{weather.rain}</Text>
              </View>
              <View style={styles.weatherItem}>
                <Ionicons name="speedometer" size={16} color="#607D8B" />
                <Text style={styles.weatherText}>{weather.wind}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('pestAlertSection')}</Text>
        {pestAlerts.map((alert) => (
          <View key={alert.id} style={[styles.pestCard, { borderLeftColor: alert.color }]}>
            <View style={styles.pestHeader}>
              <Text style={styles.pestName}>{alert.pest}</Text>
              <View style={[styles.riskBadge, { backgroundColor: alert.color }]}>
                <Text style={styles.riskText}>{alert.riskLevel}</Text>
              </View>
            </View>
            <View style={styles.preventionContainer}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <Text style={styles.preventionText}>{alert.prevention}</Text>
            </View>
          </View>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weatherCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weatherDay: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  weatherDetails: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  pestCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pestName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  preventionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
  },
  preventionText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});