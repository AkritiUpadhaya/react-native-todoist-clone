import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Todo } from '../types/interface';
interface TaskProps {
    task: Todo;
}
const Task = ({ task }: TaskProps) => {
  return (
     <View>
         <Link href={`/task/${task.id}`} style={styles.container} asChild>
         <TouchableOpacity>
            <Text>{task.name}</Text>
         </TouchableOpacity>
         </Link>
        </View>
  )
}

export default Task
const styles= StyleSheet.create({
    container:{
        padding:14,
        backgroundColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#ccc',

    }
})