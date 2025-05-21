import Fab from '@/components/Fab';
import Task from '@/components/Task';
import { projects, todos } from '@/db/schema';
import { Todo } from '@/types/interface';
import * as Sentry from '@sentry/react-native';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Button, SectionList, Text, View } from 'react-native';
interface Section {
  title: string;
  data: Todo[];
}


export default function index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);
  const [sectionListData, setSectionListData] = useState<Section[]>([]);
  const { data } = useLiveQuery(drizzleDb.select()
  .from(todos)
  .leftJoin(projects, eq(todos.project_id, projects.id))
  .where(eq(todos.completed, 0)));
  console.log("data", data);

  useEffect(() => {
    const formatedData = data?.map((item) => ({
      ...item.todos,
      project_name: item.projects?.name,
      project_color: item.projects?.color,
    }))

    const groupedByDay = formatedData?.reduce((acc: { [key: string]: Todo[] }, task) => {
      const day = format(new Date(task.due_date || new Date()), 'd MMM · eee');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});
    console.log("groupedByDay", groupedByDay);

    const listData: Section[] = Object.entries(groupedByDay || {}).map(([day, tasks]) => ({
      title: day,
      data: tasks,
    }));
    console.log("listData", listData);

    listData.sort((a, b) => {
      const dateA = new Date(a.data[0].due_date || new Date());
      const dateB = new Date(b.data[0].due_date || new Date());
      return dateA.getTime() - dateB.getTime();
    });
    setSectionListData(listData);
  
  }, [data])
  
  const randomFunc=()=>{
    throw new Error("Random error");
  }

  return (
    <>
    <View style={{flex: 1}}>
      <SectionList 
      contentInsetAdjustmentBehavior='automatic'
      sections={sectionListData}
      renderItem={({item}) => <Task task={item}/>}
      renderSectionHeader={({section}) => <Text>{section.title}</Text>}/>
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
      {/* <Button title='randomFunc' onPress={ () => {randomFunc()}}/> */}
      <Fab/>
    </View>
    </>
  );
}