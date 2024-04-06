import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';

const NewMessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message);
            setMessage('');
        }
    };

    const handleFocus = () => {
        setIsTyping(true);
    };

    const handleBlur = () => {
        setIsTyping(false);
    };

    return (
        <View style={[styles.container, isTyping && styles.containerTyping]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#003f5c"
                    value={message}
                    onChangeText={setMessage}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TouchableOpacity
                    style={[styles.sendButton, isTyping && styles.sendButtonTyping]}
                    onPress={handleSend}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    containerTyping: {
        marginBottom: 300, // Adjust this value based on your preference
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        height: 60,
        borderColor: '#003f5c',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        color: '#003f5c',
    },
    sendButton: {
        backgroundColor: '#8A2BE2', // Purple color
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    
    sendButtonText: {
        color: '#fff', // White text color
        fontWeight: 'bold',
    },
});

export default NewMessageInput;
