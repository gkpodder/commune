import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ChatDisplay from './ChatDisplay'


const fetchMessage = async() => {
  
  try {
      const response = await axios.get('YOUR_BACKEND_SERVER_URL/messages');

      if (response && response.user && response.user.uid) {
        console.log(API_URL);
          const response = await axios.post(API_URL+'account/signIn', data = {email: email});
          setMessages(response.data);
      }
  } catch (error) {
      console.log(error);
  }
}

const Chats = ({chats, onPress}) => {
    
    return (
        <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, paddingTop: 40 }}>
                {chats.map((chat, index) => (
                <ChatDisplay 
                    key={index} 
                    chatName={chat.chatName} 
                    unreadCount={chat.unreadCount} 
                    lastMessage={chat.lastMessage}
                    onPress={() => onPress(chat.chatId, chat.chatName)}
                />
                ))}
            </View>
        </ScrollView>
    )
  }

export default Chats

const styles = StyleSheet.create({
    scrollView: {
      flex: 1, // Fills the available height for scrolling
      width: "100%"
    },
  });