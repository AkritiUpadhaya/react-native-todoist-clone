import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

type TodoFormData={
    name:string,
    description:string,
    
    
}
export default function Form() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<TodoFormData>()
      const onSubmit: SubmitHandler<TodoFormData> = (data) => console.log(data) 
      console.log("submitted")
  return (
    <View>
      <Text>Form</Text>
    </View>
  )
}