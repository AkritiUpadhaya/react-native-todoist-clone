import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { toast } from 'sonner-native'

export default function Fab() {
  const onPress = () => {
    toast.success('Fab pressed')
    router.push('/(auth)/task/new')  
}
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({  
  fab:{
      position:'absolute',
      bottom:20,
      right:20,
      backgroundColor:'blue',
      borderRadius:30,
      padding:10,
      height:60,
      width:60,
      justifyContent:'center',
      alignItems:'center',
      boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)',
      
      
    }
})
    