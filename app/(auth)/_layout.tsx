import { Stack } from 'expo-router'
import React from 'react'

export default function authLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="task/new" options={{presentation:'modal'}}/>
    </Stack>
  )
}