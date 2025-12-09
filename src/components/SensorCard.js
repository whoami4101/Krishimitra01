import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

export default function SensorCard({ title, value, icon, color, unavailable = false }) {
  return (
    <View style={[styles.card, { borderLeftColor: color, opacity: unavailable ? 0.5 : 1 }]}>
      <View style={styles.header}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {unavailable && (
        <Text style={styles.unavailableText}>Sensor N/A</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  unavailableText: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    fontStyle: 'italic',
  },
});