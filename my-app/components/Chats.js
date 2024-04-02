import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ChatDisplay from './ChatDisplay'

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
                    onPress={() => onPress(chat.chatId)}
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
    },
  });