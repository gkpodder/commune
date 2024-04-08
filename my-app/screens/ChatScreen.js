import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import NewMessageInput from '../components/NewMessageInput';
import axios from 'axios';
import { Timestamp, serverTimestamp } from "@firebase/firestore";
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }) => {
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

   useEffect(() => {
      async () => {
      await loadEmail()
    };
  }, []); 

   const extractTimestamp = (messageTime) => {
    if (typeof messageTime === 'string') {
      return new Date(messageTime); // ISO 8601 format
    } else if (messageTime && messageTime.seconds) {
      const seconds = messageTime.seconds;
      const nanoseconds = messageTime.nanoseconds || 0; // Handle potential missing nanoseconds
      return new Date(seconds * 1000 + nanoseconds / 1000000);
    }
    console.warn('Invalid timestamp format for message:', messageTime);
    return null; // Handle invalid formats gracefully
  };

  const sortMessages = (messages) => {
    return messages.sort((a, b) => {
      const timeA = extractTimestamp(a.time);
      const timeB = extractTimestamp(b.time);
      if (!timeA || !timeB) return 0; // Handle potential null timestamps
      return timeA - timeB;
    });
  };

  const fetchMessages = async () => {
    try {
      const userEmail = await loadEmail();
      const response = await axios.get(API_URL + 'message/getAllMessages', {
        params: {
            email: userEmail, // Pass the email as a query parameter
            chatId: chatId
        }
      });

      // Filter messages based on chatId
      const filteredMessages = response.data.filter(message => message.chatId === chatId);

      // Sort messages before setting state
      const sortedMessages = sortMessages(filteredMessages);

      setMessages(sortedMessages);
      console.log(sortedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  

  const handleSend = async (message) => {
    const currentTime = serverTimestamp();
    const sender = await loadEmail();
    const newMessage = {
      body: message,
      chatId: chatId,
      time: Timestamp.fromDate(new Date()).toDate(),
      sender: sender
    };
    console.log(newMessage);

    try {
      const response = await axios.post(API_URL + 'message/sendMessage', newMessage);
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text>Welcome to chat {chatId} with GK! </Text>
      </View>
      <View style={styles.messageContainer}>
        <MessageList messages={messages} userEmail={userEmail} />
      </View>
      <View style={{ paddingBottom: 50 }}>
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
