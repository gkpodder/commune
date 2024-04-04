import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import LayoutComponent from '../components/Layout';
import axios from 'axios';
import Button from '../components/Button';
import AddUserComponent from '../components/AddUserComponent';

const CreateConversationScreen = () => {

  const [ searchEmail, setSearchEmail ] = useState("");
  const [ emails, setEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filteredEmails, setFilteredEmails ] = useState([]);

  const API_URL = "http://100.93.80.104:3000/";

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(API_URL + "account/");
        const body = response.data
  
        setEmails(body);
        setFilteredEmails(body);
  
      } catch (error) {
        console.log(error);
        alert('Sign in failed: ' + error.message)
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmails();
  }, [])

  const handleSearch = (text) => {
    setSearchEmail(text);

    const filtered = emails.filter(item => 
      item.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredEmails(filtered);
  }

  const handleNewConversation = (email) => {
    console.log("creating conversation with: ", email);
  }

  if (isLoading) {
    return (
      <LayoutComponent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading users...</Text>
          </View>
      </LayoutComponent>
    )
  }

  return (
    <LayoutComponent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome to the Create Conversation Page!</Text>
          <TextInput value={searchEmail} onChangeText={text => handleSearch(text)} placeholder="search email"></TextInput>
          {filteredEmails.map((email, index) => {
            return (
              <View key={index}>
                <AddUserComponent onPress={() => handleNewConversation(email.email)} email={email.email} />
              </View>
            )
          })}
        </View>
    </LayoutComponent>
  )
}

export default CreateConversationScreen

styles = StyleSheet.create({
  search: {
    textAlign: "center"
  }
})