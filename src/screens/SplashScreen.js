import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  return (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../logo.png')} style={styles.logo} />
        <Text style={styles.title}>KrishiMitra</Text>
        <Text style={styles.subtitle}>Your Smart Farming Companion</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    opacity: 0.9,
  },
});