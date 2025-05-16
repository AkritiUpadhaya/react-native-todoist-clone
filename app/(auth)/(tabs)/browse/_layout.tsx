import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function browseLayout() {
  return (
    <Stack screenOptions={{headerShadowVisible:false, contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" 
      options={{ 
        title:'Browse', 
        headerLeft:({})=>{
          return(
            <HeaderLeft/>
          )
        },
        headerRight:({})=>{
          return(
            <HeaderRight/>
          )
        }
    }}/>
    </Stack>
  )
}

const HeaderLeft = () => {
  const {user}= useUser();
    return<Image source={{uri: user?.imageUrl}} style= {styles.image}/>
}

const HeaderRight = () => {
    return(
        <Ionicons name="settings-outline" size={24} color="black"/>
    )
}

const styles = StyleSheet.create({
    image:{
        width:32,
        height:32,
        borderRadius:16,
        
    }
})