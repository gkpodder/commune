import { View, Text } from 'react-native'
import LayoutComponent from '../components/Layout'
import React from 'react'

const SummarizeScreen = () => {
  return (
    <LayoutComponent>    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the Summarize Page!</Text>
        </View>
    </LayoutComponent>
  )
}

export default SummarizeScreen