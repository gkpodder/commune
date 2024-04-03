import { View, Text } from 'react-native'
import React from 'react'
import ImageButton from './ImageButton'
import { useNavigation } from '@react-navigation/native';

const CreateConversationComponent = () => {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Conversation');
  }

  return (
    <View>
      <ImageButton onPress={handlePress} iconName='person-add-outline'/>
    </View>
  )
}

export default CreateConversationComponent