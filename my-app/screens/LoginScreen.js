import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

  // change your api_url here
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const saveEmail = async() => {
        try {
            await AsyncStorage.setItem('userEmail', email);
            console.log('Email saved to async storage');
        } catch (error) {
            console.error('Error saving email to async storage');
        }
    }

    const saveKeys = async(userKey, sessionKeys) => {
        // saving userKeys
        try {
            const stringifiedKeyData = userKey[0];
            const stringifiedSessionData = JSON.stringify(sessionKeys);
            await AsyncStorage.setItem('userKey', stringifiedKeyData);
            await AsyncStorage.setItem('sessionKey', stringifiedSessionData)
            console.log('Keys saved to async storage');
        } catch (error) {
            console.error('Error saving userKey', userKey);
        }
        // saving sessionKeys

    }

    const signIn = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            if (response && response.user && response.user.uid) {
                const response = await axios.post(API_URL+'account/signIn', data = {email: email});
                const body = response.data;
                const chats = body.chats;
                const userKey = body.userKey;
                const sessionKeys = body.sessionKeys;
                console.log(userKey, sessionKeys)
                
                await saveEmail();
                await saveKeys(userKey, sessionKeys);

                navigation.navigate('Home', { email: email })
            }
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
 
            if (response) {
                const response = await axios.post(API_URL+'account/signUp', data = {email: email});
                if (response.data) {

                }
                Alert.alert(
                    'Successful Sign Up',
                    'Please login to continue into commune',
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            }
 
            
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
                    <Button onPress={signIn} buttonText='LOGIN' />

                    <Button onPress={signUp} buttonText='SIGN UP' />
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
