import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ChatDisplay = ({chatName, unreadCount, lastMessage, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.infoContainer}>
                <Text style={styles.chatName}>{chatName}</Text>
                <Text style={styles.lastMessage}>{lastMessage}</Text>
                </View>
                {unreadCount > 0 && (<View style={styles.unreadContainer}>
                    <Text style={styles.unreadText}>{unreadCount}</Text>
                </View>
                )}
            </View>
        </TouchableOpacity>
    )
  }



export default ChatDisplay

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    infoContainer: {
      flex: 1,
      marginRight: 10,
    },
    chatName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    lastMessage: {
      fontSize: 14,
      color: '#666',
    },
    unreadContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF6347',
      borderRadius: 12,
      width: 24,
      height: 24,
    },
    unreadText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    scrollView: {
      flex: 1, // Fills the available height for scrolling
    },
  });
  