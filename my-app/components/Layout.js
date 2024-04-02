import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SmallImageButton from './SmallImageButton';
import { useNavigation } from '@react-navigation/native';

const LayoutComponent = ({ children }) => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack(); // Go back to the previous screen on the stack
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Layout Component!</Text>
        
      <View style={styles.buttonContainer}>
        <SmallImageButton onPress={handleNavigateBack} iconName='chevron-back'/>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
});

export default LayoutComponent;

