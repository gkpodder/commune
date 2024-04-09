import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import NewMessageInput from '../components/NewMessageInput';
import axios from 'axios';
import { Timestamp, serverTimestamp, collection, onSnapshot, query, where } from "@firebase/firestore";
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../FirebaseConfig';
import { update } from 'firebase/database';

const ChatScreen = ({ route }) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { chatId, chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [ otherEmail, setOtherEmail ] = useState(undefined);

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

    const messagesQuery = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId) // Filter by chatId
      // orderBy('createdAt', 'desc') // Order by createdAt descending (optional)
    );
    
    const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
      const updatedDocuments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Process the updated documents here (e.g., update state)
    });

  }, []); 

   const extractTimestamp = (messageTime) => {
    if (typeof messageTime === 'string') {
      return new Date(messageTime); // ISO 8601 format
    } else if (messageTime && messageTime.seconds) {
      const seconds = messageTime.seconds;
      const nanoseconds = messageTime.nanoseconds || 0; // Handle potential missing nanoseconds
      return new Date(seconds * 1000 + nanoseconds / 1000000);
    }
    // console.warn('Invalid timestamp format for message:', messageTime);
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

      const uniqueEmails = [...new Set(filteredMessages.map(message => message.sender))];
      console.log(uniqueEmails);

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
      <KeyboardAvoidingView
        style={{ flex: 1 }} // Ensure the KeyboardAvoidingView takes up the full screen
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Customize vertical offset if needed
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat #{chatId} with {chatName} </Text>
        </View>
        <View style={styles.messageContainer}>
          <MessageList messages={messages} userEmail={userEmail} />
        </View>
        <View>
          <NewMessageInput onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageContainer: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ChatScreen;
