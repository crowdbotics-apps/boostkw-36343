import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginContainer, SignUpContainer, PasswordReset } from '@/Containers'

const AuthStack = createStackNavigator()

// @refresh reset
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
      initialRouteName="Login"
    >
      <AuthStack.Screen
        name="Login"
        component={LoginContainer}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpContainer}
      />
      <AuthStack.Screen
        name="PassReset"
        component={PasswordReset}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
