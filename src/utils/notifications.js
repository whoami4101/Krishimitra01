import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (title, body, trigger = null) => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions not granted');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: trigger || { seconds: 1 },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const scheduleFarmAlerts = () => {
  // Schedule daily moisture check
  scheduleNotification(
    'Daily Farm Check',
    'Check your soil moisture levels',
    {
      hour: 8,
      minute: 0,
      repeats: true,
    }
  );

  // Schedule evening summary
  scheduleNotification(
    'Farm Summary',
    'Review today\'s farm conditions',
    {
      hour: 18,
      minute: 0,
      repeats: true,
    }
  );
};

export const sendMoistureAlert = (moistureLevel) => {
  if (moistureLevel < 25) {
    scheduleNotification(
      'Low Soil Moisture Alert',
      `Moisture dropped to ${moistureLevel}%. Please irrigate.`,
      { seconds: 1 }
    );
  }
};

export const sendWeatherAlert = (weatherCondition) => {
  scheduleNotification(
    'Weather Alert',
    `${weatherCondition} expected tomorrow - adjust irrigation accordingly`,
    { seconds: 1 }
  );
};