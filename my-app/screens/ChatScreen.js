import { View, Text, StyleSheet} from 'react-native'
import React, { useState, useEffect} from 'react';
import MessageList from '../components/MessageList'; 
import NewMessageInput from '../components/NewMessageInput';
import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({route}) => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const loadEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('userEmail');
          if (storedEmail !== null) {
            setUserEmail(storedEmail);
            return storedEmail;
          }
        } catch (error) {
          console.error('Error loading email:', error);
        }
      };

    const handleSend = async (message) => {
        const currentTime = new Date();
        const sender = await loadEmail();
        const newMessage = {
            body: message,
            chatId: chatId,
            time: {
                _nanoseconds: currentTime.getMilliseconds() * 1000000, // Convert milliseconds to nanoseconds
                _seconds: Math.floor(currentTime.getTime() / 1000) // Convert milliseconds to seconds
            },
            sender: sender
        }
        console.log(newMessage);
        // Refetch messages after sending a new message
        
        try {
            const response = await axios.post(API_URL+'message/sendMessage', newMessage);

        } catch (error) {
            console.log(error);
        }
        // Logic to send the message to the backend or update state
    };


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
