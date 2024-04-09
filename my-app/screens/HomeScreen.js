import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';
import ImageButton from '../components/ImageButton';
import Chats from '../components/Chats';
import CreateConversationComponent from '../components/CreateConversationComponent';
import ReceiveConversationComponent from '../components/ReceiveConversationComponent';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const HomeScreen = ({navigation, route}) => {
  const { email } = route.params;

  const [chatsData, setChatsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL+'account/signIn', data = {email: email});
      const body = response.data;
      const chats = body.chats;
      setChatsData(chats);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  const handleSummarizePress = () => {
    navigation.navigate("Summarize");
  };

  const handleSupportPress = () => {
    navigation.navigate("Support");
  };  

  const handleChatPress = (chatId, chatName) => {
    navigation.navigate('Chat', { chatId: chatId, chatName: chatName})
  }

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.chatSection}>
          <Chats chats={chatsData} onPress={handleChatPress}/>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <ImageButton onPress={handleSummarizePress} iconName='albums-outline' />
        <CreateConversationComponent />
        <ReceiveConversationComponent />
        <ImageButton onPress={handleSupportPress} iconName='accessibility-outline' />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0, // Position the top bar at the bottom of the screen
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16, // Adjust padding as needed

  },
  chatSection: {
    flex: 1,
    width: "100%",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    zIndex: 1, // Ensure buttons appear above the empty section
  },
  scrollView: {
    flex: 1, 
    width: "100%"
  }
});