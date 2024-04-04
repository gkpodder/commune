import { View, Text, StyleSheet} from 'react-native'
import React, { useState, useEffect} from 'react';
import MessageList from '../components/MessageList'; 
import NewMessageInput from '../components/NewMessageInput';
import axios from 'axios'

const ChatScreen = ({route}) => {

    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);

    const handleSend = (message) => {
        // Logic to send the message to the backend or update state
    };

    const API_URL = "http://100.125.168.14:3000/";
    useEffect(() => {
        // Function to fetch messages from the backend server
        const fetchMessages = async () => {
            try {
                const response = await axios.get(API_URL+'message/getAllMessages');
                // Filter messages based on chatId
                const filteredMessages = response.data.filter(message => message.chatId === chatId);
                setMessages(filteredMessages);
                
            } catch (error) {
                console.log(error);
            }
        };
    
        // Call the fetchMessages function when the component mounts
        fetchMessages();
      }, []); 


      return (
        <View style={styles.screenContainer}>
            <View style={styles.header}>
                <Text>Welcome to chat {chatId} with GK! </Text>
            </View>
            <View style={styles.messageContainer}>
                <MessageList messages={messages} />
            </View>
            <View style={{paddingBottom: 50}}>
                <NewMessageInput onSend={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    header: {
        padding: 50,
    },
    messageContainer: {
        flex: 1,
        padding: 20,
    },
});

export default ChatScreen;
