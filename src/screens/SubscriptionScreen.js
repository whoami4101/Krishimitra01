import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SubscriptionScreen() {
  const navigation = useNavigation();

  const plans = [
    {
      name: 'Bronze',
      icon: '🥉',
      color: '#CD7F32',
      components: ['ESP-32', 'DHT11', 'Soil Moisture'],
      price: '420.00',
      subsidizedMin: '84.00',
      subsidizedMax: '210.00',
    },
    {
      name: 'Silver',
      icon: '🥈',
      color: '#C0C0C0',
      components: ['ESP-32', 'DHT11', 'Soil Moisture', 'PH Sensor', 'NPK Sensor'],
      price: '2620.00',
      subsidizedMin: '524.00',
      subsidizedMax: '1310.00',
    },
    {
      name: 'Gold',
      icon: '🥇',
      color: '#FFD700',
      components: ['ESP-32', 'DHT11', 'Soil Moisture', 'PH Sensor', 'NPK Sensor', 'Memory Module', 'ESP32-CAM'],
      price: '3170.00',
      subsidizedMin: '634.00',
      subsidizedMax: '1585.00',
    },
    {
      name: 'Diamond',
      icon: '💎',
      color: '#B9F2FF',
      components: ['ESP-32', 'DHT11', 'Soil Moisture', 'PH Sensor', 'NPK Sensor', 'Memory Module', 'ESP32-CAM', 'GSM'],
      price: '3540.00',
      subsidizedMin: '708.00',
      subsidizedMax: '1770.00',
    },
  ];

  const PlanCard = ({ plan }) => (
    <View style={[styles.card, { borderLeftColor: plan.color, borderLeftWidth: 4 }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.planIcon}>{plan.icon}</Text>
        <Text style={styles.planName}>{plan.name}</Text>
      </View>
      
      <View style={styles.componentsContainer}>
        {plan.components.map((component, index) => (
          <View key={index} style={styles.componentRow}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.componentText}>{component}</Text>
          </View>
        ))}
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Cost:</Text>
        <Text style={styles.price}>₹{plan.price}</Text>
      </View>

      <View style={styles.subsidyContainer}>
        <Text style={styles.subsidyLabel}>After using PMDDKY scheme:</Text>
        <Text style={styles.subsidyPrice}>₹{plan.subsidizedMin} – ₹{plan.subsidizedMax}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Hardware Packages</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#4CAF50" />
          <Text style={styles.infoText}>
            Choose the right hardware package for your farm. All packages include free app access and cloud storage.
          </Text>
        </View>

        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            PMDDKY (Pradhan Mantri Dhan-Dhaanya Krishi Yojana) subsidy varies by state and farmer category.
          </Text>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  planIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  componentsContainer: {
    marginBottom: 15,
  },
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  priceContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subsidyContainer: {
    marginTop: 10,
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
  },
  subsidyLabel: {
    fontSize: 13,
    color: '#4CAF50',
    marginBottom: 5,
    fontWeight: '600',
  },
  subsidyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  footer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    textAlign: 'center',
  },
});
