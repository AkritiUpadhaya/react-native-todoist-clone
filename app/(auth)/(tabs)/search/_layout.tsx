import { Stack } from 'expo-router'
import React from 'react'

export default function searchLayout() {
  return (
     <Stack screenOptions={{headerShadowVisible:false, contentStyle:{backgroundColor:'#fff'}}}>
          <Stack.Screen name="index" 
          options={{ 
            title:'Search', 
            headerLargeTitle:true,
            headerSearchBarOptions:{
                placeholder:'Tasks, Projects, and More..'
            }
        }}/>
        </Stack>
  )
}