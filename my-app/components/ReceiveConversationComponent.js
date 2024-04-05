import { View, Text } from 'react-native'
import React from 'react'
import ImageButton from './ImageButton'
import { useNavigation } from '@react-navigation/native';

const ReceiveConversationComponent = () => {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Receive');
  }

  return (
    <View>
      <ImageButton onPress={handlePress} iconName='archive-outline'/>
    </View>
  )
}

export default ReceiveConversationComponent