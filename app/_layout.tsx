import migrations from '@/drizzle/migrations';
import { addDummyData } from '@/utils/addDummyData';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import React, { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


  const InitialLayout = () => {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    useEffect(() => {
      if (!isLoaded || !isMounted) return;
      const inAuthGroup = segments[0] === '(auth)';
  
      if (isSignedIn && !inAuthGroup) {
        router.replace('/(auth)/(tabs)/today');
      } else if (!isSignedIn && pathname !== '/') {
        router.replace('/');
      }
    }, [isLoaded,isSignedIn, segments ,isMounted], );
  
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    return (
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  };
  

const Rootlayout = () => {

  const expoDb= openDatabaseSync('todos')
  const db= drizzle(expoDb)
  const {success, error}= useMigrations(db, migrations)

  useEffect(()=>{
    if(!success)
      return
    addDummyData(db)
      
  },[success])

  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <Suspense fallback={<ActivityIndicator size="large" color="blue" />}>
        <SQLiteProvider 
        databaseName='todos'
        useSuspense>
        <GestureHandlerRootView>
        <Toaster />
        <InitialLayout />
        </GestureHandlerRootView>
        </SQLiteProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Rootlayout;