import Fab from '@/components/Fab';
import { todos } from '@/db/schema';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);
  const { data } = useLiveQuery(drizzleDb.select().from(todos));
  console.log("data", data);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
      <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', marginLeft: 16, marginBottom: 16 }}>
        Today
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((todo: any) => (
            <View
              key={todo.id}
              style={{
                backgroundColor: '#f7f7f7',
                borderRadius: 12,
                padding: 16,
                marginHorizontal: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Text style={{ color: '#222', fontSize: 18, fontWeight: '600' }}>
                {todo.name}
              </Text>
              {todo.description && (
                <Text style={{ color: '#555', marginTop: 4 }}>
                  {todo.description}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>
            No todos found.
          </Text>
        )}
      </ScrollView>
      <Fab />
    </View>
  );
}