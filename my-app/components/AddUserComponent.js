import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddUserComponent = ({ email, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{email}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    textAlign: "center"
  },
  button: {
    backgroundColor: '#7e22ce',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddUserComponent;
