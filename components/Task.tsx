import React from 'react';
import { Text, View } from 'react-native';
import { Todo } from '../types/interface';
interface TaskProps {
    task: Todo;
}
const Task = ({ task }: TaskProps) => {
  return (
    <View>
      <Text>{task.name}</Text>
    </View>
  )
}

export default Task