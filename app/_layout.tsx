import migrations from '@/drizzle/migrations';
import { addDummyData } from '@/utils/addDummyData';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import React, { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

Sentry.init({
  dsn: 'https://0f271e66bd3e35987c2c1e2548cca49a@o4509350067372032.ingest.us.sentry.io/4509350106759168',
  attachScreenshot: true,
  

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration({
    maskAllText: false,
    maskAllImages: false,
    maskAllVectors: false,
  }), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
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
        useSuspense
        options={{enableChangeListener:true}}>
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

export default Sentry.wrap(Rootlayout);