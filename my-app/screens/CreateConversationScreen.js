import { View, Text, TextInput, StyleSheet, Modal } from 'react-native';
import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import LayoutComponent from '../components/Layout';
import axios from 'axios';
import AddUserComponent from '../components/AddUserComponent';

const CreateConversationScreen = () => {

  const [ searchEmail, setSearchEmail ] = useState("");
  const [ emails, setEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filteredEmails, setFilteredEmails ] = useState([]);
  const [ isModal, setIsModal ] = useState(false);
  const [ selectedEmail, setSelectedEmail ] = useState("");

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
    setSelectedEmail(email);
    toggleModal();
  }

  const toggleModal = () => {
    setIsModal(!isModal);
  }

  const createConversation = () => {
    axios.post()
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