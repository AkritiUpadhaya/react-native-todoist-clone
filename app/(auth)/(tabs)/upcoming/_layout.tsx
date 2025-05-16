import MoreButton from '@/components/MoreButton'
import { Stack } from 'expo-router'
import React from 'react'

export default function upcomingLayout() {
  return (
    <Stack screenOptions={{headerShadowVisible:false, contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" 
      options={{ 
        title:'Upcoming', 
        headerRight:({})=>{
          return(
            <MoreButton pageName="Upcoming"/>
          )
        }
    }}/>
    </Stack>
  )
}