import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { TopStatusBar } from '@/Components'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import AuthNavigator from './Auth'
import { navigationRef } from './utils'
import LinearGradient from 'react-native-linear-gradient'
import { setupHttpConfig, addTokenToHttp } from '@/Utils/http'
import { useSelector } from 'react-redux'
import { PasswordChange } from '@/Containers'
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const auth = useSelector((state) => state.auth)
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn)


  useEffect(() => {
    setupHttpConfig()
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

  }, [])

  useEffect(() => {
    auth?.user?.token && addTokenToHttp(auth?.user?.token)
  }, [auth?.user?.token])

  const isLoggged = (auth?.user?.token && auth.remember) || isLoggedIn

  // console.log(auth)


  // const { colors } = NavigationTheme

  return (
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill]}>
    <SafeAreaView style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      <TopStatusBar backgroundColor="#000A62" barStyle="light-content" />
      {
        isLoggged ? 
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="PasswordChange"
            component={PasswordChange}
            options={{
              animationEnabled: true,
            }}
          />

        </Stack.Navigator>
        :
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      }
      </NavigationContainer>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default ApplicationNavigator
