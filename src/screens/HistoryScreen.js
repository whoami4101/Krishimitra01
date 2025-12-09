import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('7days');

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [45, 42, 38, 41, 47, 52, 49],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  const filters = [
    { key: 'today', label: t('today') },
    { key: '7days', label: t('last7days') },
    { key: '30days', label: t('last30days') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('historicalData')}</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="share" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('soilMoisture')} (%)</Text>
        <LineChart
          data={chartData}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('temperature')} (°C)</Text>
        <LineChart
          data={{
            ...chartData,
            datasets: [
              {
                data: [25, 27, 29, 28, 26, 24, 25],
                color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('phLevel')}</Text>
        <LineChart
          data={{
            ...chartData,
            datasets: [
              {
                data: [6.8, 6.9, 6.7, 6.8, 6.9, 6.8, 6.8],
                color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('nitrogen')} - ppm</Text>
        <LineChart
          data={{
            ...chartData,
            datasets: [
              {
                data: [85, 82, 88, 86, 84, 87, 85],
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('phosphorus')} - ppm</Text>
        <LineChart
          data={{
            ...chartData,
            datasets: [
              {
                data: [42, 45, 40, 43, 41, 44, 42],
                color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('potassium')} - ppm</Text>
        <LineChart
          data={{
            ...chartData,
            datasets: [
              {
                data: [68, 70, 65, 67, 69, 66, 68],
                color: (opacity = 1) => `rgba(121, 85, 72, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exportButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});