import { Colors } from '@/constants/Colors'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Button, useWindowDimensions } from 'react-native'
export default function authLayout() {
  const {height}= useWindowDimensions()
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="task/new" options={{presentation:'formSheet',
        title:'',
        headerShown:false,
        sheetAllowedDetents:height>700?[0.22]:[0.3],
        sheetExpandsWhenScrolledToEdge:false,
        sheetCornerRadius:12,
      }}/>
      <Stack.Screen name="task/[id]" options={{presentation:'formSheet',
         title:'',
         headerShown:false,
         sheetAllowedDetents:height>700?[0.22]:'fitToContents',
         sheetExpandsWhenScrolledToEdge:false,
         sheetCornerRadius:12,
      }}/>
      <Stack.Screen name="task/date" options={{presentation:'formSheet',
         title:'Schedule',
         headerShown:true,
         sheetAllowedDetents:height>700?[0.6, 0.9]:'fitToContents',
         sheetExpandsWhenScrolledToEdge:false,
         sheetCornerRadius:12,
         headerLeft:()=>{
          return(
            <Button title="Cancel" onPress={()=>router.back()} color={Colors.primary}/>
          )
         }
      }}/>
    </Stack>
  )
}