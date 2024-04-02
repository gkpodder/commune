import { View, Text } from 'react-native'
import React from 'react'

const ChatScreen = ({route}) => {

    const { chatId } = route.params;
        
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to chat {chatId}! </Text>
        </View>
    )
}

export default ChatScreen