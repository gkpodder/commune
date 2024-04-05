import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SmallImageButton from './SmallImageButton';

const ReceiveUserComponent = ({ email, onAccept, onReject }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{email}</Text>
      <SmallImageButton onPress={onAccept} iconName='add'/>
      <SmallImageButton onPress={onReject} iconName='logo-xbox' />
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

export default ReceiveUserComponent;
