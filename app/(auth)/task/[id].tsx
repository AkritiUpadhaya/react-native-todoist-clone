import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'


const Page = () => {
    const {id}= useLocalSearchParams()
    console.log("page id", id)
  return (
    <View>
      <Text>Page:{id}</Text>
    </View>
  )
}

export default Page