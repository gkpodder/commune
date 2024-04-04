import { View, Text } from 'react-native'
import React, { useState } from 'react';
import MessageList from '../components/MessageList'; 

const ChatScreen = ({route}) => {

    const { chatId } = route.params;
    const [messages, setMessages] = useState([
    { sender: 'Alice', body: 'Hi there!' },
    { sender: 'Bob', body: 'Hey! How are you?' },
    { sender: 'Alice', body: "I'm doing well, thanks!" }
    ]);
        
   
    return (
        <View style={{ flex: 1}}>
        <View style={{ padding: 50 }}>
            <Text>Welcome to chat {chatId}! </Text>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
            <MessageList messages={messages} />
        </View>
        <View style={{ padding: 50 }}>
            <Text> hi</Text>
            {/* <MessageInput onSendMessage={handleSendMessage} /> */}
        </View>
        </View>
    );
};

export default ChatScreen