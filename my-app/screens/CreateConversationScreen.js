import { View, Text, TextInput, StyleSheet, Modal } from 'react-native';
import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import LayoutComponent from '../components/Layout';
import axios from 'axios';
import AddUserComponent from '../components/AddUserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateConversationScreen = () => {

  const [ searchEmail, setSearchEmail ] = useState("");
  const [ emails, setEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filteredEmails, setFilteredEmails ] = useState([]);
  const [ isModal, setIsModal ] = useState(false);
  const [ selectedEmail, setSelectedEmail ] = useState("");
  const [ userEmail, setUserEmail ] = useState("");

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

  const fetchEmails = async () => {
    try {
      const userEmail = await loadEmail();
      const response = await axios.get(API_URL + "account/");
      const body = response.data
      const filteredBody = body.filter((email) => email !== userEmail);
      console.log(userEmail);
      console.log(filteredBody);

      setEmails(filteredBody);
      setFilteredEmails(filteredBody);

    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchData = async () => {
    try {
      await loadEmail(); // Wait for loadEmail to finish
      await fetchEmails(); // Then fetch emails
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleSearch = (text) => {
    setSearchEmail(text);

    const filtered = emails.filter(item => 
      item.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredEmails(filtered);
  }

  const handleNewConversation = (email) => {
    setSelectedEmail(email);
    toggleModal();
  }

  const toggleModal = () => {
    setIsModal(!isModal);
  }

  const createConversation = async () => {
    const response = await axios.post(API_URL+'conversation/create', data = {sender: userEmail, recipient: selectedEmail});
    console.log(response.data);
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
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>Select User to Create Conversation</Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModal}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Confirm that you'd like to request a conversation with { selectedEmail } </Text>
                <Button buttonText="Confirm" onPress={createConversation} />
                <Button buttonText="Close" onPress={toggleModal} />
              </View>
            </View>
          </Modal>

          <View style={styles.searchContainer}>
            <TextInput 
              value={searchEmail} 
              onChangeText={text => handleSearch(text)} 
              placeholder="search email" 
              style={styles.search}   
            />
          </View>
          
          {filteredEmails.map((email, index) => {
            return (
              <View key={index}>
                <AddUserComponent onPress={() => handleNewConversation(email)} email={email} />
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
    textAlign: "center",
    fontSize: 16,
    width: "100%"
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 50,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow for Android
  },
})