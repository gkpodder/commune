import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';
import ImageButton from '../components/ImageButton';
import Chats from '../components/Chats';
import CreateConversationComponent from '../components/CreateConversationComponent';

const HomeScreen = ({navigation, route}) => {

  const { chatsData } = route.params;

  const handleSummarizePress = () => {
    navigation.navigate("Summarize");
  };

  const handleSupportPress = () => {
    navigation.navigate("Support");
  };

  const handleChatPress = (chatId) => {
    navigation.navigate('Chat', { chatId: chatId})
  }

  return (
    <View style={styles.container}>
      <CreateConversationComponent />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.chatSection}>
          <Chats chats={chatsData} onPress={handleChatPress}/>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <ImageButton onPress={handleSummarizePress} iconName='albums-outline' />
        <ImageButton onPress={handleSupportPress} iconName='accessibility-outline' />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    chatSection: {
      flex: 1,
      width: "100%",
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      zIndex: 1, // Ensure buttons appear above the empty section
    },
    backgroundColor: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0, // Position the top bar at the bottom of the screen
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16, // Adjust padding as needed

  },
  chatSection: {
    flex: 1,
    width: "100%",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    zIndex: 1, // Ensure buttons appear above the empty section
  },
});