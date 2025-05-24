import { Colors } from '@/constants/Colors'
import { projects } from '@/db/schema'
import { Project } from '@/types/interface'
import { Ionicons } from '@expo/vector-icons'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Todo } from '../types/interface'

type FormProps={
  todo?:Todo & {project_name:string; project_color:string; project_id:number}
}

type TodoFormData={
    name:string,
    description:string,   
}
const Form=({todo}:FormProps)=>{
  const db= useSQLiteContext()
  const drizzleDb= drizzle(db)
    const {
        control,
        trigger,
        handleSubmit,
        formState: { errors },
      } = useForm<TodoFormData>({
        defaultValues:{
          name:todo?.name || '',
          description:todo?.description || '',
        }
      })

      const {data} = useLiveQuery(drizzleDb.select().from(projects))
      const [selectedProject, setSelectedProject] = useState<Project>(
        todo?.project_id
          ? {
              id: todo.project_id,
              name: todo.project_name,
              color: todo.project_color,
            }
          : {
              id: 1,
              name: 'Inbox',
              color: '#000',
            }
      );
      const onSubmit: SubmitHandler<TodoFormData> = (data) => console.log(data) 
      console.log("submitted")
  return (
    <View style={{flex:1}}>
          <ScrollView contentContainerStyle={[styles.container]} >
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.titleInput}
                placeholder="Task name"
                value={value}
                onChangeText={onChange}
                autoFocus
                autoCorrect={false}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
              />
            )}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.actionButtonsContainer}
            >
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="flag-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Priority</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="pricetags-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Labels</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="location-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Location</Text>
            </Pressable>
          </ScrollView> 



        </ScrollView>
        </View>
     
  )
}
export default Form
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 12,
    paddingTop: 16,
  },
  titleInput: {
    fontSize: 20,
    paddingHorizontal: 16,
  },
  descriptionInput: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  outlinedButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  outlinedButtonText: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    padding: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  projectButtonText: {
    fontSize: 16,
  },
});