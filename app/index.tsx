import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import { Button, SafeAreaView, View } from 'react-native'

export const useWarmUpBrowser = () => {
    useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  
  WebBrowser.maybeCompleteAuthSession()
  
  export default function index() {
    useWarmUpBrowser()
  
    const { startSSOFlow } = useSSO()
  
    const onPress = useCallback(async () => {
      try {
        
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy: 'oauth_google',
          
          redirectUrl: AuthSession.makeRedirectUri(),
        })
  
       
        if (createdSessionId) {
          setActive!({ session: createdSessionId })
        } else {
          
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    }, [])
  
    return (
        <SafeAreaView>
      <View>
        <Button title="Sign in with Google" onPress={onPress} />
      </View>
      </SafeAreaView>
    )
  }