import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MessageList = ({ messages, userEmail  }) => {
    // Function to convert timestamp object to milliseconds
    const timestampToMilliseconds = timestamp => {
        return timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000;
    };

    // Sort messages by date and time
    const sortedMessages = messages
    // .sort((a, b) => {
    //     const timeA = timestampToMilliseconds(a.time);
    //     const timeB = timestampToMilliseconds(b.time);
    //     return timeA - timeB;
    // });

    return (
        <FlatList
            data={sortedMessages}
            renderItem={({ item }) => (
                <View style={[styles.messageContainer, item.sender === userEmail ? styles.userMessage : styles.otherMessage]}>
                    <View style={styles.senderContainer}>
                        <Text style={styles.senderText}>{item.sender}</Text>
                    </View>
                    <View style={styles.messageTextContainer}>
                        <Text style={styles.messageText}>{item.body}</Text>
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        maxWidth: '80%', // Limit width of the message container
    },
    userMessage: {
        alignSelf: 'flex-end', // Align user's messages to the right
        backgroundColor: '#BA55D3', // Lighter purple for user's messages
    },
    otherMessage: {
        alignSelf: 'flex-start', // Align other user's messages to the left
        backgroundColor: '#8A2BE2', // Purple color
    },
    senderContainer: {
        marginBottom: 5, // Add some space between sender and message text
    },
    senderText: {
        color: '#000', // Black text color for sender's email
    },
    messageTextContainer: {
        marginLeft: 10, // Add some space between sender and message text
    },
    messageText: {
        color: '#fff', // White text color
    },
});

export default MessageList;
