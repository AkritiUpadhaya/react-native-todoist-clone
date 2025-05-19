import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { todos } from '../db/schema';
import { Todo } from '../types/interface';
interface TaskProps {
    task: Todo;
}
const Task = ({ task }: TaskProps) => {
    const db= useSQLiteContext();
    const drizzleDb = drizzle(db);

    const markTaskCompleted = async () => {
        console.log("markTaskCompleted");
        await drizzleDb.update(todos)
        .set({completed:1, date_completed: Date.now()})
        .where(eq(todos.id, task.id))
    }

  return (
     <View>
         <Link href={`/task/${task.id}`} style={styles.container} asChild>
         <TouchableOpacity>
            <View style= {styles.row}>
                <BouncyCheckbox
                size={20}
                textContainerStyle={{display:'none'}}
                fillColor={task.project_color}
                isChecked={task.completed==1}
                onPress={()=>{markTaskCompleted()}}
                />
                <Text style={styles.name}>{task.name}</Text>
            </View>
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
    },
    row:{
        flexDirection:'row',
        alignItems:'flex-start',
        gap:10,

    },
    name:{
        fontSize:16,
        fontWeight:'500',
    }
})