import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const LoginScreen = ({navigation}) => {

  const handlePress = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Login Page!</Text>
      <Button onPress={handlePress} buttonText="test"/>
    </View>
  );
};

export default LoginScreen;
