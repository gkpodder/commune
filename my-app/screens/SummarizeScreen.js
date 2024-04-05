import { View, Text, ScrollView, StyleSheet } from 'react-native'
import LayoutComponent from '../components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SummarizeScreen = () => {
  const [summary, setSummary] = useState('Loading summary...')
  const API_URL = "http://100.81.216.12:3000/";

  const content = `
Person 1: Hey, Sarah, have you heard about that new cafe that opened up downtown?
Person 2: Oh, yeah, I think I saw something about it on social media. What's it called again?
Person 1: It's called "Steamy Beans." Apparently, they have this amazing selection of exotic coffees from around the world.
Person 2: That sounds interesting! I'm always up for trying new coffee places. When do you want to check it out?
Person 1: How about this Saturday afternoon? We can grab a cup of coffee and catch up.
Person 2: Sounds perfect! I've been so busy lately, it'll be nice to have a relaxing afternoon.
Person 1: Definitely. Plus, it'll give us a chance to explore someplace new in the city.
Person 2: Absolutely! I'm looking forward to it. Thanks for suggesting it.
Person 1: No problem at all. It's always fun discovering hidden gems together.
`;

  useEffect(() => {
    axios.post(API_URL + 'summarize', { content: content })
      .then((response) => {
        setSummary(response.data)
      })
      .catch(error => {
        console.error(error)
        setSummary('Error loading summary')
      })
  }, [])

  return (
    <LayoutComponent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Summarize Page!</Text>
      </View>
      <ScrollView>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={styles.summaryBlock}>
            <Text style={styles.chatId}>Chat ID: {i + 1}</Text>
            <Text>{summary}</Text>
          </View>
        ))}
      </ScrollView>
    </LayoutComponent>
  )
}

const styles = StyleSheet.create({
  summaryBlock: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#ADD8E6', // Light blue color
    borderRadius: 5, // Rounded corners
  },
  chatId: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SummarizeScreen