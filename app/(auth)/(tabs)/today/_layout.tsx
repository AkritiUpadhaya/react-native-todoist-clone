import MoreButton from '@/components/MoreButton'
import { Stack } from 'expo-router'
import React from 'react'

export default function todayLayout() {
  return (
    <Stack screenOptions={{headerShadowVisible:false, contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" 
      options={{ 
        title:'Today', 
        headerLargeTitle:true,
        headerRight:()=> <MoreButton pageName="Today" />
    }}
    />
    </Stack>
  )
}