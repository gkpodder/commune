import { View, Text, ScrollView, StyleSheet } from 'react-native'
import LayoutComponent from '../components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SummarizeScreen = () => {
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState({});
  const API_URL = "http://100.81.216.12:3000/";
  const user = { "user": "gkpodder2003@gmail.com" };


  //Retrieves msg data from the backend and then summarizes it with another call and then displays it
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response1 = await axios.post(API_URL + 'summarize/chats', user);
        setContents(response1.data);

        const response2 = await axios.post(API_URL + 'summarize', response1.data);
        const data = response2.data;
        const summaries = Object.keys(data).map(chatId => ({
          id: chatId,
          summary: data[chatId].content
        }));
        setSummary(summaries);
      } catch (error) {
        console.error(error);
        setSummary('Error loading summary');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutComponent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Summarize Page!</Text>
      </View>
      <ScrollView>
        {Object.keys(contents).map((chatId) => (
          <View key={chatId} style={styles.summaryBlock}>
            <Text style={styles.chatId}>Chat ID: {chatId}</Text>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Text>{summary.find(item => item.id === chatId)?.summary || 'No summary available'}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </LayoutComponent>
  );
};

const styles = StyleSheet.create({
  summaryBlock: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#CBC3E3', // Light purple  
    borderRadius: 5, // Rounded corners
  },
  chatId: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SummarizeScreen