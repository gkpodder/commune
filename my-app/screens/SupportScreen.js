import React, {useState} from 'react'
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';

const SupportScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = () => {
    console.log('Name', name);
    console.log('Email', email);
    console.log('Message', message);
    setSubmitted(true);
  };

  const handleClosePopup = () => {
    setSubmitted(false);
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Can I use Commune on my personal device?',
      answer: 'Currently, Commune is designed for X company Android devices.',
    },
    {
      question: 'Who are my conversations visible to?',
      answer: 'Your personal conversations are private and not visible to the company. We prioritize user privacy and adhere to strict data protection policies.',
    },
    {
      question: 'What measures are in place to prevent unauthorized access to Commune conversations and corporate data?',
      answer: 'Our application employs robust encryption protocols to secure all communications within the platform. Messages, files, and other data are encrypted end-to-end, ensuring that only authorized users can access the information.Additionally, we utilize a Key Distribution Center (KDC) to initiate conversations securely, providing an extra layer of protection against unauthorized access and interception of communication channels.',
    },
    // Add more questions here smile
  ];

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={{ fontSize: 35, marginBottom: 10, marginTop: 50, textAlign: 'center',}}>Support & FAQ</Text>

        <Text style={{ fontSize: 24, marginTop: 10, marginBottom: 10, alignSelf: 'center' }}>Frequently Asked Questions</Text>
      <ScrollView style={styles.scrollView}>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} onPress={() => toggleExpand(index)}>
              <View style={styles.faqItem}>
                <Text style={styles.question}>{faq.question}</Text>
              </View>
              {expandedIndex === index && (
                <View style={style={backgroundColor: '#f0f0f0', padding:10, borderRadius: 5, marginBottom: 10,}}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
          <View style={styles.box}>
            <Text style={{ fontSize: 24, marginTop: 20, marginBottom: 20, textAlign:'center', color: 'white'}}>Contact Support</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.message}
              placeholder="Message"
              multiline={true}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={submitted}
          onRequestClose={handleClosePopup}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={style={fontSize: 18, marginBottom: 10,}}>Form submitted successfully!</Text>
              <Button title="Close" onPress={handleClosePopup} />
            </View>
          </View>
        </Modal>
        
    </View>
  );
};

export default SupportScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
      marginHorizontal:10,
      marginVertical: 5,
    },
    faqItem: {
      backgroundColor: '#e0e0e0',
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
      marginHorizontal: 10,
      alignContent: 'center',
    },
    question: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    answer: {
      fontSize: 16,
      marginTop: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    submitButton: {
      backgroundColor: '#f3e8ff', 
      paddingVertical: 10, 
      marginHorizontal: 70,
      alignItems: 'center',
      borderRadius: 10, 
      elevation: 3,
    },
    submitText: {
      fontSize: 18,
      color: 'black',
    },
    input: {
        backgroundColor: '#f3e8ff', // bg-purple-100
        paddingHorizontal: 10, // px-1
        borderWidth: 1, // border
        borderColor: '#7e22ce', // border-purple-500
        borderRadius: 4, // rounded
        width: 300, // w-64 (assuming 1rem = 16 units in React Native)
        height: 40, // h-12 (assuming 1rem = 16 units in React Native)
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10, 
        fontSize: 20
    },
    message: {
        backgroundColor: '#f3e8ff', // bg-purple-100
        paddingHorizontal: 10, // px-1
        borderWidth: 1, // border
        borderColor: '#7e22ce', // border-purple-500
        borderRadius: 4, // rounded
        width: 300, // w-64 (assuming 1rem = 16 units in React Native)
        height: 100, // h-12 (assuming 1rem = 16 units in React Native)
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10, 
        fontSize: 20,
        textAlignVertical: 'top'
    },
    box: {
      borderWidth: 1,
      borderColor: '#f3e8ff',
      borderRadius: 15,
      padding: 20,
      marginBottom: 10,
      backgroundColor: '#7e22ce',
      width: '95%',
      alignSelf: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      elevation: 5,
    },
    
})