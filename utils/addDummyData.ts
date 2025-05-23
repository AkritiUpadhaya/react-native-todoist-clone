import { projects, todos } from '@/db/schema';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';

import AsyncStorage from 'expo-sqlite/kv-store';

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync('initialized');
  if (value) return;

  await db.insert(projects).values([
    { name: 'Inbox', color: '#000000' },
    { name: 'Work', color: '#0a009c' },
  ]);
  await db.insert(todos).values([
    {
      name: 'add a reminder',
      description: 'make a todoist app',
      priority: 1,
      completed: 0,
      project_id: 1,
      date_added: Date.now(),
    },
    {
      name: 'Buy groceries for the week',
      priority: 2,
      completed: 0,
      project_id: 1,
      date_added: Date.now(),
    },
  ]);
  AsyncStorage.setItemSync('initialized', 'true');
};