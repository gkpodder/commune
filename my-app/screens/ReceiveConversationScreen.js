import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import LayoutComponent from '../components/Layout'
import axios from 'axios';
import ReceiveUserComponent from '../components/ReceiveUserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionService from '../components/SessionService';
import { useNavigation } from '@react-navigation/native';

const ReceiveConversationScreen = () => {

    const [ requests, setRequests ] = useState([]);
    const [ userEmail, setUserEmail ] = useState("");
    const [ userKey, setUserKey ] = useState("");

    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const loadEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('userEmail');
          if (storedEmail !== null) {
            return storedEmail;
          }
        } catch (error) {
          console.error('Error loading email:', error);
        }
    };

    const loadKeys = async () => {
        console.log("loading keys")
        try {
          const key = await AsyncStorage.getItem('userKey');
          if (key) {
            setUserKey(key);
            return key;
          }
        } catch (error) {
          console.error('Error loading key:', error);
        }
      };

    const fetchData = async () => {
        const email = await loadEmail();
        await loadKeys();
        setUserEmail(email);

        const response = await axios.post(API_URL+'conversation/get', data = {email: email});
        const body = response.data;

        const minorRequests = []

        body.forEach(element => {
            minorRequests.push(
                element.senderEmail
            )
        });

        setRequests(minorRequests);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onAccept = async (email) => {
        console.log(email);
        console.log(userEmail);
        const response = await axios.post(API_URL+'conversation/accept', data={sender: email, recipient: userEmail});
        const userKey = await loadKeys();
        console.log(userKey);
        const key = response.data.key;
        const chatId = response.data.chatId;
        const parsedKey = key.replace(userKey+"(", "").replace(")", "");

        await SessionService.addSessionKey(parsedKey, chatId);
        console.log('Session key added:', parsedKey, chatId);
    }

    const onReject = (email) => {
        console.log("rejected request from ", email);
    }

    const Conversations = () => {
        return (
            <View>
                {
                    requests.map((item, i) => {
                        return (
                            <View key={i}>
                                <ReceiveUserComponent onAccept={() => onAccept(item)} onReject={() =>onReject(item)} email={item}/>
                            </View>
                            
                        )
                    })
                }
            </View>
        )
        
    }

    return (
        <LayoutComponent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Welcome to the Receive Conversation Page!</Text>
                <Conversations/>
            </View>
        </LayoutComponent>
    )
}

export default ReceiveConversationScreen