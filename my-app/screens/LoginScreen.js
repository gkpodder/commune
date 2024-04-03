import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'twrnc';
import axios from 'axios';

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // change your api_url here
  const API_URL = "http://100.93.80.104:3000/";

  const signIn = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            if (response && response.user && response.user.uid) {
              console.log(API_URL);
                const response = await axios.post(API_URL+'account/signIn', data = {email: email});
                const body = response.data
                console.log(body)

                navigation.navigate('Home', { chatsData: body })
            }
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp =  async() => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
            <KeyboardAvoidingView behavior='padding'>
                <View style={tw`pb-10`}>
                    <Image
                        source={require('../assets/logo_with_text.png')}
                        style={{ width: 400, height: 200 }}
                    />
                </View>
                
                <View style={tw`mb-6`}>
                    <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={tw`mb-6`}>
                    <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.flexContainer}>
                    <Button onPress={signIn} buttonText='LOGIN'/>

                    <Button onPress={signUp} buttonText='SIGN UP'/>
                </View>
                
            </KeyboardAvoidingView>
        </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1, // flex-1
      justifyContent: 'center', // justify-center
      alignItems: 'center', // items-center
      backgroundColor: '#ffffff', // bg-white
  },
  input: {
      backgroundColor: '#f3e8ff', // bg-purple-100
      paddingHorizontal: 4, // px-1
      borderWidth: 1, // border
      borderColor: '#7e22ce', // border-purple-500
      borderRadius: 4, // rounded
      width: 300, // w-64 (assuming 1rem = 16 units in React Native)
      height: 48, // h-12 (assuming 1rem = 16 units in React Native)
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      fontSize: 24
  },
  flexContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
  }
})
