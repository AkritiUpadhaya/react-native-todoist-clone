import Fab from '@/components/Fab'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { useSQLiteContext } from 'expo-sqlite'
import React from 'react'
import { Text, View } from 'react-native'

export default function index() {
  const db= useSQLiteContext();
  useDrizzleStudio(db)

  return (
    <View>
      <Text>index</Text>
      <Fab/>
    </View>
  )
}