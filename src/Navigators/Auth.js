import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginContainer, SignUpContainer, PasswordReset, TermsContainer, PrivacyContainer } from '@/Containers'

const AuthStack = createStackNavigator()

// @refresh reset
const AuthNavigator = ({ navigation }) => {
  return (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
      initialRouteName="Login"
    >
      <AuthStack.Screen
        name="Login"
        navigation={navigation}
        component={LoginContainer}
      />
      <AuthStack.Screen
        name="SignUp"
        navigation={navigation}
        component={SignUpContainer}
      />
      <AuthStack.Screen
        name="PassReset"
        navigation={navigation}
        component={PasswordReset}
      />
      <AuthStack.Screen
        name="Terms"
        navigation={navigation}
        component={TermsContainer}
      />
      <AuthStack.Screen
        name="Privacy"
        navigation={navigation}
        component={PrivacyContainer}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
