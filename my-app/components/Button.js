import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7e22ce', // bg-purple-500
    paddingHorizontal: 4, // px-1
    borderRadius: 4, // rounded
    width: 128, // w-32 (assuming 1rem = 32 units in React Native)
    height: 48, // h-12 (assuming 1rem = 32 units in React Native)
    marginVertical: 10, // Adjust margin as needed
    alignItems: 'center', // Center the text horizontally in the button
    justifyContent: 'center', // Center the text vertically in the button
    alignSelf: 'center',
    margin: 10
  },
  buttonText: {
    color: '#ffffff', // text-white
    fontWeight: 'bold', // font-bold
    fontSize: 20, // text-xl (assuming 1rem = 32 units in React Native)
  },
});

export default Button;
