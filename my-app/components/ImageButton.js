import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

const ImageButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name={iconName} size={50} color='#7e22ce' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7e22ce',
    backgroundColor: 'white',
    height: 75,
    width: 75,
    // padding: 5
  },
});

export default ImageButton;