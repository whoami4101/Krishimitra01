import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { LanguageProvider } from './src/context/LanguageContext';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DeviceConnectionScreen from './src/screens/DeviceConnectionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AIInsightsScreen from './src/screens/AIInsightsScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FarmerInputScreen from './src/screens/FarmerInputScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import CropSelectionScreen from './src/screens/CropSelectionScreen';
import { useLanguage } from './src/context/LanguageContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'History') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'AI Insights') iconName = focused ? 'bulb' : 'bulb-outline';
          else if (route.name === 'Forecast') iconName = focused ? 'cloud' : 'cloud-outline';
          else if (route.name === 'Farmer Input') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10,
          height: 65,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: t('dashboard') }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: t('history') }} />
      <Tab.Screen name="AI Insights" component={AIInsightsScreen} options={{ title: t('aiInsights') }} />
      <Tab.Screen name="Forecast" component={ForecastScreen} options={{ title: t('forecast') }} />
      <Tab.Screen name="Farmer Input" component={FarmerInputScreen} options={{ title: t('farmerInput') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <LanguageProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding && (
          <Stack.Screen name="Onboarding">
            {props => <OnboardingScreen {...props} onComplete={() => setShowOnboarding(false)} />}
          </Stack.Screen>
        )}
        {!isConnected && (
          <Stack.Screen name="DeviceConnection">
            {props => <DeviceConnectionScreen {...props} onConnect={() => setIsConnected(true)} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CropSelection" component={CropSelectionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
  );
}