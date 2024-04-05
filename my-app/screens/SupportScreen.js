import React from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import LayoutComponent from '../components/Layout'

const SupportScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(False);

  const HandleFormSubmit = () => {
    console.log('Name', name);
    console.log('Email', email);
    console.log('Message', message);
    setSubmitted(True);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Welcome to the Support Page!</Text>

          <Text style={{ fontSize: 18, marginTop: 20 }}>Frequently Asked Questions</Text>
          <View style={{ marginTop: 10 }}>
            {/* Insert questions here smile */}
            <Text>Q: How do I reset my password?</Text>
            <Text>A: Good question.</Text>

            <Text style={{ marginTop: 10 }}>Q: How can I contact support?</Text>
            <Text>A: You can contact support by filling out the contact form below.</Text>

            <Text style={{ marginTop: 10 }}>Q: peepeepoopoo?</Text>
            <Text>A: poopoopeepee.</Text>
          </View>

          <Text style={{ fontSize: 18, marginTop: 20 }}>Contact Support</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, textAlignVertical: 'top' }}
            placeholder="Message"
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Submit" onPress={handleFormSubmit} />

          {submitted && <Text style={{ marginTop: 10, color: 'green' }}>Form submitted successfully!</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

export default SupportScreen