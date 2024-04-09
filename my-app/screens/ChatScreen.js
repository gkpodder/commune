import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import NewMessageInput from '../components/NewMessageInput';
import axios from 'axios';
import { Timestamp, serverTimestamp } from "@firebase/firestore";
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { chatId, chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [sessionKey, setSessionKey] = useState("");

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

  const loadKeys = async () => {
    console.log("loading keys")
    try {
      const storedKeysString = await AsyncStorage.getItem('sessionKey');
      console.log(storedKeysString);
      if (storedKeysString !== null) {
        const storedKeys = JSON.parse(storedKeysString);
        const matchingKey = storedKeys.find(obj => obj.chatId === chatId);

        if (matchingKey) {
          const key = matchingKey.key;
          console.log('Matching key:', key);
          setSessionKey(key);
          return key;
        } else {
          console.log('No matching key found.');
        }
      }
    } catch (error) {
      console.error('Error loading key:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadEmail()
      await loadKeys()
      fetchMessages();
      
    };

    loadData();

    fetchMessages();
  }, [sessionKey]); 

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
    const userEmail = await loadEmail();
    const _ = await loadKeys();
    // TODO fix fetchMessages completing before await loadKeys()
    try {
      const _ = await loadKeys();
      
      const response = await axios.get(API_URL + 'message/getAllMessages', {
        params: {
            email: userEmail, // Pass the email as a query parameter
            chatId: chatId
        }
      });

      // Filter messages based on chatId
      const filteredMessages = response.data.filter(message => message.chatId === chatId);

      const filteredDecryptedMessages = filteredMessages.map( message => {
          const modifiedBody = message.body.replace(sessionKey+"(","").replace(")", "");
          return { ...message, body: modifiedBody };
        }
      );

      console.log(filteredDecryptedMessages);

      // Sort messages before setting state
      const sortedMessages = sortMessages(filteredDecryptedMessages);

      setMessages(sortedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (message) => {
    const sender = await loadEmail();

    // Encrypt the message using AES-256
    const encryptedMessage = sessionKey + "(" + message + ")";

    console.log(encryptedMessage);

    const newMessage = {
      body: encryptedMessage,
      chatId: chatId,
      time: Timestamp.fromDate(new Date()).toDate(),
      sender: sender
    };

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
