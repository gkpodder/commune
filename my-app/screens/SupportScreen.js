import { View, Text } from 'react-native'
import React from 'react'
import LayoutComponent from '../components/Layout'

const SupportScreen = () => {
  return (
    <LayoutComponent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Support Page!</Text>
        </View>
    </LayoutComponent>
  )
}

export default SupportScreen