import { View, Text, ScrollView, StyleSheet } from 'react-native'
import LayoutComponent from '../components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SummarizeScreen = () => {
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://100.81.216.12:3000/";

  const contents = {
    "1": {
      "content": "Person 1: Hey, Sarah, have you heard about that new cafe that opened up downtown?\nPerson 2: Oh, yeah, I think I saw something about it on social media. What's it called again?\nPerson 1: It's called \"Steamy Beans.\" Apparently, they have this amazing selection of exotic coffees from around the world.\nPerson 2: That sounds interesting! I'm always up for trying new coffee places. When do you want to check it out?\nPerson 1: How about this Saturday afternoon? We can grab a cup of coffee and catch up.\nPerson 2: Sounds perfect! I've been so busy lately, it'll be nice to have a relaxing afternoon.\nPerson 1: Definitely. Plus, it'll give us a chance to explore someplace new in the city.\nPerson 2: Absolutely! I'm looking forward to it. Thanks for suggesting it.\nPerson 1: No problem at all. It's always fun discovering hidden gems together."
    },
    "2": {
      "content": "Person 1: Hey, Mike, did you hear about the new regulations on cryptocurrency trading? Person 2: Yeah, I read something about it online. It seems like governments are starting to crack down on it more. Person 1: It's definitely becoming more mainstream, but with that comes more scrutiny, I guess. Person 2: I wonder how it's going to affect the market. I've been thinking about investing in some crypto, but now I'm not so sure. Person 1: Yeah, it's a bit uncertain right now. I think it's essential to do thorough research before diving in, especially with all these changes happening. Person 2: True. I've been trying to educate myself more about blockchain technology and different cryptocurrencies before making any decisions. Person 1: That's a smart move. Understanding the technology behind it all can definitely help in making informed choices. Person 2: Exactly. I don't want to rush into anything and end up regretting it later. Person 1: Agreed. It's always better to be cautious, especially when it comes to investments."
    },
    "3": {
      "content": "Person 1: Hey, Emily, have you watched the latest episode of that new TV series everyone's talking about?\nPerson 2: No, I haven't had the chance to catch up yet. Is it good?\nPerson 1: It's amazing! The plot twists are mind-blowing, and the characters are so well-developed.\nPerson 2: Sounds intriguing! I'll definitely add it to my watchlist.\nPerson 1: You should! We can binge-watch it together sometime.\nPerson 2: That sounds like a plan. Thanks for the recommendation!\nPerson 1: No problem! Let me know when you're free, and we'll set up a viewing party.\nPerson 2: Will do!"
    },
    "4": {
      "content": "Person 1: Hey, Jason, did you hear about the new restaurant that opened up in the neighborhood?\nPerson 2: Yeah, I heard it's getting rave reviews. What kind of food do they serve?\nPerson 1: It's a fusion place, blending flavors from different cuisines. I've heard their sushi burritos are to die for.\nPerson 2: That sounds delicious! We should definitely check it out sometime.\nPerson 1: Absolutely! How about this Friday night?\nPerson 2: Sounds good to me. I'll clear my schedule.\nPerson 1: Great! I'll make a reservation.\nPerson 2: Looking forward to it!"
    },
    "5": {
      "content": "Person 1: Hi, Alex! Have you seen the latest movie that came out last week?\nPerson 2: No, I haven't had the chance yet. Was it any good?\nPerson 1: It was fantastic! The special effects were out of this world, and the storyline kept me on the edge of my seat.\nPerson 2: Sounds like a must-watch! I'll try to catch it this weekend.\nPerson 1: You won't regret it! We can even go together if you're up for it.\nPerson 2: That sounds like a plan. Thanks for the recommendation!\nPerson 1: Anytime! Let me know when you're free, and we'll make it happen.\nPerson 2: Sure thing!"
    },
    "6": {
      "content": "Person 1: Hey, Rachel, have you been following the latest news about space exploration?\nPerson 2: Not really. What's been happening?\nPerson 1: Scientists discovered a new exoplanet that could potentially support life!\nPerson 2: That's incredible! What do we know about it?\nPerson 1: It's in the habitable zone of its star and has similar characteristics to Earth.\nPerson 2: Wow, imagine if there are aliens living there!\nPerson 1: It's definitely an exciting prospect. Who knows what we might find out there.\nPerson 2: Indeed. The universe never ceases to amaze.\nPerson 1: Absolutely. It's a reminder of how much there is still to explore beyond our own planet.\nPerson 2: Makes you wonder what else is out there, doesn't it?\nPerson 1: Absolutely. The possibilities are endless."
    }
  }

  useEffect(() => {
    setIsLoading(true)
    axios.post(API_URL + 'summarize', contents)
      .then((response) => {
        const data = response.data
        const summaries = Object.keys(data).map(chatId => ({
          id: chatId,
          summary: data[chatId].content
        }));
        setSummary(summaries);
        setIsLoading(false)
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
  )
}

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