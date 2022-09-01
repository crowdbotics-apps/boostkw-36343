import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { TopStatusBar } from '@/Components'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import AuthNavigator from './Auth'
import { navigationRef } from './utils'
import LinearGradient from 'react-native-linear-gradient'
import { setupHttpConfig } from '@/Utils/http'
import { useSelector } from 'react-redux'
import { setLoggedIn } from '@/Services/modules/app'
import { useDispatch } from 'react-redux'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn)


  useEffect(() => {
    setupHttpConfig()
    checkLogin()
  }, [])

  const checkLogin = () => {
    if(auth?.user?.token && auth.remember) dispatch(setLoggedIn({ loggedIn: true}))
  }



  // const { colors } = NavigationTheme

  return (
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill]}>
    <SafeAreaView style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      <TopStatusBar backgroundColor="#000A62" barStyle="light-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ?  "Main" : "Auth"}>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default ApplicationNavigator
