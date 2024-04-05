import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import LayoutComponent from '../components/Layout'
import axios from 'axios';
import ReceiveUserComponent from '../components/ReceiveUserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReceiveConversationScreen = () => {

    const [ requests, setRequests ] = useState([]);

    const API_URL = "http://100.93.80.104:3000/";

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

    const fetchData = async () => {
        const email = await loadEmail();

        
        const response = await axios.post(API_URL+'conversation/get', data = {email: email});
        const body = response.data;

        const minorRequests = []

        body.forEach(element => {
            minorRequests.push(
                element.senderEmail
            )
        });
        console.log(minorRequests);

        setRequests(minorRequests);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onAccept = (email) => {
        console.log("accepted request from ", email);
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