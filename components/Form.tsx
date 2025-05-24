import { Colors } from '@/constants/Colors'
import { projects } from '@/db/schema'
import { Project } from '@/types/interface'
import { Ionicons } from '@expo/vector-icons'
import { eq } from 'drizzle-orm'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { todos } from '../db/schema'
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
        },
        mode:'onChange'
      })
      const [selectedDate, setSelectedDate] = useState<Date>(
        todo?.due_date ? new Date(todo.due_date) : new Date()
      );

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

      const [previouslySelectedDate, setPreviouslySelectedDate] = useMMKVString('selectedDate');

  useEffect(() => {
    if (previouslySelectedDate) {
      setSelectedDate(new Date(previouslySelectedDate));
      setPreviouslySelectedDate(undefined);
    }
  }, [previouslySelectedDate]);
      useEffect(()=>{
        trigger()
      },[trigger])
      const onSubmit = async (data: TodoFormData) => {
        if (todo) {
          await drizzleDb
            .update(todos)
            .set({
              name: data.name,
              description: data.description,
              project_id: selectedProject.id,
              due_date:selectedDate.getTime(),
            })
            .where(eq(todos.id, todo.id));
        } else {
          await drizzleDb.insert(todos).values({
            name: data.name,
              description: data.description,
              project_id: selectedProject.id,
              priority: 0,
              date_added: Date.now(),
              completed: 0,
              due_date:selectedDate.getTime(),
          });
        }
        router.dismiss();
      };
      
      const changeDate=()=>{
        const dateString= selectedDate.toISOString().split('T')[0];
          setPreviouslySelectedDate(dateString);
          router.push('/task/date')
      }
  return (
    <View style={{flex:1}}>
          <ScrollView contentContainerStyle={[styles.container]} keyboardShouldPersistTaps="always" >
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value , onBlur} }) => (
              <TextInput
                style={styles.titleInput}
                placeholder="Task name"
                value={value}
                onBlur={onBlur}
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
            keyboardShouldPersistTaps="always"
            >
              <Pressable
              onPress={changeDate}
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="calendar-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Date</Text>
            </Pressable>
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
        <View style={styles.bottomRow}>
        <Pressable
        onPress={()=>{console.log("pressed")}}
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="pricetags-outline" size={20} color={Colors.dark} />
              <Text>Labels</Text>
            </Pressable>

            <Pressable 
            onPress={handleSubmit(onSubmit)}
            style={[styles.submitButton, { opacity: errors.name ? 0.5 : 1 }]}>
              <Ionicons name="arrow-up" size={24} color={"#fff"} />
            </Pressable>
        </View>


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