
import Fab from '@/components/Fab'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function index() {
  return (
    <>
   <ScrollView contentInsetAdjustmentBehavior='automatic'>
         <View>
         <Text>home</Text>
       </View>
       </ScrollView>
       <Fab/>
       </>
  )
}