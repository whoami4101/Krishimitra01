import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../utils/i18n';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [soilThreshold, setSoilThreshold] = useState(30);

  const showCropSelector = () => {
    navigation.navigate('CropSelection', {
      selectedCrop,
      onSelect: (crop) => setSelectedCrop(crop),
    });
  };

  const showLanguageSelector = () => {
    navigation.navigate('LanguageSelection');
  };

  const showThresholdSelector = () => {
    Alert.alert(
      'Soil Moisture Threshold',
      'Set minimum soil moisture level for alerts',
      [
        { text: '20%', onPress: () => setSoilThreshold(20) },
        { text: '25%', onPress: () => setSoilThreshold(25) },
        { text: '30%', onPress: () => setSoilThreshold(30) },
        { text: '35%', onPress: () => setSoilThreshold(35) },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color="#666" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings')}</Text>
        <Text style={styles.subtitle}>{t('customizeExp')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('farmConfig')}</Text>
        
        <SettingItem
          icon="leaf"
          title={t('cropType')}
          subtitle={t(selectedCrop)}
          onPress={showCropSelector}
        />
        
        <SettingItem
          icon="water"
          title={t('threshold')}
          subtitle={`${soilThreshold}% - Alert when below this level`}
          onPress={showThresholdSelector}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('notifications')}</Text>
        
        <SettingItem
          icon="notifications"
          title={t('notifications')}
          subtitle={t('receiveAlerts')}
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('preferences')}</Text>
        
        <SettingItem
          icon="language"
          title={t('language')}
          subtitle={languages.find(l => l.code === language)?.nativeName}
          onPress={showLanguageSelector}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('support')}</Text>
        
        <SettingItem
          icon="help-circle"
          title={t('helpFaq')}
          subtitle={t('getHelp')}
          onPress={() => Alert.alert(t('helpFaq'), 'Help documentation coming soon!')}
        />
        
        <SettingItem
          icon="mail"
          title={t('contactSupport')}
          subtitle={t('getInTouch')}
          onPress={() => Alert.alert(t('contactSupport'), 'Email: support@krishimitra.com')}
        />
        
        <SettingItem
          icon="information-circle"
          title={t('about')}
          subtitle={t('version')}
          onPress={() => Alert.alert(t('about'), 'KrishiMitra - Smart Farming Companion\n' + t('version') + '\n\nDeveloped for farmers to monitor and optimize their crops using IoT sensors and AI insights.')}
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
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  settingItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});