import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function Page() {
  return (

    <View style={{marginTop:100}}>
        <Link href='/browse/projects/colors'>Next</Link>
      <Text >Projects</Text>

    </View>
  )
}