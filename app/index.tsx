import { useSSO } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


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
  
    const onGooglePress = useCallback(async () => {
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

    const onApplePress = useCallback(async () => {
        try {
          const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
            strategy: 'oauth_apple',
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

      const onFacebookPress = useCallback(async () => {
        try {
          const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
            strategy: 'oauth_facebook',
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
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image source={require('../assets/images/todoist-logo.png')} style={styles.logo}/>
          <Image source={require('../assets/images/login.png')} style={styles.loginImage}/>
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onGooglePress} style={styles.button}>
            <Ionicons name="logo-google" size={24} color="black" />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onApplePress} style={styles.button}>
            <Ionicons name="logo-apple" size={24} color="black" />
            <Text style={styles.buttonText}>Sign in with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFacebookPress} style={styles.button}>
            <Ionicons name="logo-facebook" size={24} color="black" />
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>By continuing, you agree to our Terms and Conditions and Privacy Policy</Text>
          </View>
    
        </View>
        </SafeAreaView>
    )
  }
  const styles=StyleSheet.create({
    container:{
      gap:40,
      // marginTop:20,
      // alignItems:'center',
    },
    logo:{
      height:40,
      resizeMode:'contain',
      alignSelf:'center', 
    },
    loginImage:{
      height:280,
      resizeMode:'contain',
      alignSelf:'center', 
    },
    buttonContainer:{
      gap:20,
      marginHorizontal:20,
      // alignItems:'center',
    },
    button:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      borderRadius:6,
      borderWidth:StyleSheet.hairlineWidth,
      borderColor:'#ccc',
      gap:10,
    },
    buttonText:{
      fontSize:20,
      fontWeight:500,
    },
    termsText:{
      fontSize:12,
      color:'#ccc',
      textAlign:'center',
    }
  })