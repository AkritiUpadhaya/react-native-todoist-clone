import MoreButton from '@/components/MoreButton'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function todayLayout() {
  return (
    <Stack screenOptions={{headerShadowVisible:false, contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" 
      options={{ 
        title:'Today', 
        headerLargeTitle:true,
        headerRight:()=><View style={{ flex: 1, overflow: 'visible' }}>
        <MoreButton pageName="Today" />
      </View>
    }}
    />
    </Stack>
  )
}