import { View, Text} from 'react-native'
import React, { useState, useEffect} from 'react';
import MessageList from '../components/MessageList'; 
import axios from 'axios'

const ChatScreen = ({route}) => {

    const { chatId } = route.params;
    const [messages, setMessages] = useState([
    { sender: 'Alice', body: 'Hi there!' },
    { sender: 'Bob', body: 'Hey! How are you?' },
    { sender: 'Alice', body: "I'm doing well, thanks!" }
    ]);

    const API_URL = "http://100.125.168.14:3000/";
    useEffect(() => {
        // Function to fetch messages from the backend server
        const fetchMessages = async () => {
            try {
                const response = await axios.get(API_URL+'message/getAllMessages');
                console.log("chats")
                console.log(response)
                // setMessages(response.data);
                
            } catch (error) {
                console.log(error);
            }
        };
    
        // Call the fetchMessages function when the component mounts
        fetchMessages();
      }, []); 

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the Summarize Page!</Text>
        </View>
    )
   
    // return (
    //     <View style={{ flex: 1}}>
    //     <View style={{ padding: 50 }}>
    //         <Text>Welcome to chat {chatId}! </Text>
    //     </View>
    //     <View style={{ flex: 1, padding: 20 }}>
    //         <MessageList messages={messages} />
    //         {/* <MessageList messages={chatId} /> */}
    //     </View>
    //     <View style={{ padding: 50 }}>
    //         <Text> hi</Text>
    //         {/* <MessageInput onSendMessage={handleSendMessage} /> */}
    //     </View>
    //     </View>
    // );
};

export default ChatScreen