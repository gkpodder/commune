// SessionService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionService = {
  getSessionKeys: async () => {
    try {
      const keysString = await AsyncStorage.getItem('sessionKeys');
      return keysString ? JSON.parse(keysString) : {};
    } catch (error) {
      console.error('Error retrieving session keys:', error);
      return {};
    }
  },

  addSessionKey: async (newKey, newValue) => {
    try {
      const keysObject = await SessionService.getSessionKeys();
      keysObject[newKey] = newValue;
      await AsyncStorage.setItem('sessionKeys', JSON.stringify(keysObject));
      console.log('Session key added:', newKey);
    } catch (error) {
      console.error('Error adding session key:', error);
    }
  },

  saveSessionKeys: async (keysObject) => {
    try {
      await AsyncStorage.setItem('sessionKeys', JSON.stringify(keysObject));
      console.log('Session keys saved');
    } catch (error) {
      console.error('Error saving session keys:', error);
    }
  }
};

export default SessionService;
