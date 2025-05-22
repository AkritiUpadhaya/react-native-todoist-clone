import { projects } from '@/db/schema'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { eq } from 'drizzle-orm'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const Page=()=> {
  const {signOut}= useAuth()
  const db= useSQLiteContext()
  const drizzleDb= drizzle(db)
  const {data}= useLiveQuery(drizzleDb.select().from(projects))
  const isPro= false
  console.log("data", data.length)

  const onDelete=async (id:number)=>{
    await drizzleDb.delete(projects).where(eq(projects.id, id))
  }
  
const onNewProject= ()=>{

  if(data.length>=5 && !isPro){
    router.push('/(auth)/(tabs)/browse/projects')
    // go pro
  }
  else{
   alert("same kinda error")
  }
}  
  return (
    <>
    <View style={styles.container} >
      <View style={styles.header}>
      <Text style={styles.headerText}>My projects</Text>
      <TouchableOpacity onPress={onNewProject}>
        <Ionicons name='add' size={24} color='black'/>
      </TouchableOpacity>
      </View>
      <FlatList data={data} 
      renderItem={({item})=><Text>{item.name}</Text>}
      keyExtractor={(item)=>item.id.toString()}
      ItemSeparatorComponent={()=> <View style={styles.separator}/>}
      ListFooterComponent={
        <TouchableOpacity style={styles.botton}>
          <Button title='Log out' onPress={()=>signOut()}/>
        </TouchableOpacity> 
    }
      />
     
    </View>
    </>
  )}

const styles= StyleSheet.create({
  container:{
    padding:16,
    flex:1,
    backgroundColor:'#f9f9f9',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  headerText:{
    fontSize:16,
    fontWeight:'bold',
  },
  separator:{
    height:StyleSheet.hairlineWidth,
    backgroundColor:'#ccc',
    marginVertical:8,
  },
  botton:{
    padding:14,
    backgroundColor:'#fff',
    borderRadius:8,
    alignItems:'center',
    marginTop:10, 
  },
})  
export default Page
