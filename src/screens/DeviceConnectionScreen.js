import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { checkESP32Connection } from '../services/esp32Service';

export default function DeviceConnectionScreen({ onConnect }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState(null);

  const handleWiFiConnect = async () => {
    setConnectionMethod('Wi-Fi');
    setIsConnecting(true);

    Alert.alert(
      'Connect to ESP32 WiFi',
      'Please connect to "ESP32-Farm-Dashboard" WiFi network.\n\nPassword: farm123456\n\nThen tap "Check Connection"',
      [
        { text: 'Open WiFi Settings', onPress: () => Linking.openSettings() },
        { 
          text: 'Check Connection', 
          onPress: async () => {
            const isConnected = await checkESP32Connection();
            setIsConnecting(false);
            
            if (isConnected) {
              Alert.alert(
                'Connection Successful',
                'Connected to ESP32 device via WiFi',
                [{ text: 'OK', onPress: onConnect }]
              );
            } else {
              Alert.alert(
                'Connection Failed',
                'Could not connect to ESP32. Please ensure you are connected to "ESP32-Farm-Dashboard" WiFi.',
                [{ text: 'Retry', onPress: handleWiFiConnect }]
              );
            }
          }
        },
        { text: 'Cancel', onPress: () => setIsConnecting(false), style: 'cancel' }
      ]
    );
  };

  const handleBluetoothConnect = async () => {
    setConnectionMethod('Bluetooth');
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="wifi" size={80} color="#4CAF50" />
        <Text style={styles.title}>Connect Device</Text>
        <Text style={styles.subtitle}>Choose connection method</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleBluetoothConnect}
          disabled={isConnecting}
        >
          <Ionicons name="bluetooth" size={40} color="#2196F3" />
          <Text style={styles.optionText}>Connect via Bluetooth</Text>
          <Text style={styles.optionSubtext}>ESP32 Device</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleWiFiConnect}
          disabled={isConnecting}
        >
          <Ionicons name="wifi" size={40} color="#FF9800" />
          <Text style={styles.optionText}>Connect via Wi-Fi</Text>
          <Text style={styles.optionSubtext}>ESP32-Farm-Dashboard</Text>
        </TouchableOpacity>
      </View>

      {isConnecting && (
        <View style={styles.connecting}>
          <Text style={styles.connectingText}>
            Searching for KrishiMitra Device...
          </Text>
          <Text style={styles.connectingSubtext}>
            Connecting via {connectionMethod}
          </Text>
        </View>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>WiFi Instructions:</Text>
        <Text style={styles.instructionSubtext}>1. Select "Connect via Wi-Fi"</Text>
        <Text style={styles.instructionSubtext}>2. Connect to "ESP32-Farm-Dashboard"</Text>
        <Text style={styles.instructionSubtext}>3. Password: farm123456</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  options: {
    marginBottom: 40,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    flex: 1,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
    marginLeft: 15,
  },
  connecting: {
    alignItems: 'center',
    marginBottom: 30,
  },
  connectingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  connectingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  instructions: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  instructionSubtext: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 10,
    marginTop: 5,
  },
});