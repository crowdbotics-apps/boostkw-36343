import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import {
  LoginContainer,
  SignUpContainer,
  PasswordReset,
  TermsContainer,
  PrivacyContainer,
  ProfileContainer,
  FeedbackContainer,
} from '@/OldContainers'

import { TabBar } from './tabs'
import Dashboard from '@/container/app/screens/Dashboard'
import TrackerInput from '@/container/app/screens/TrackerInput'
import Tracker from '@/container/app/screens/Tracker'

const RootStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const TrackerStack = createStackNavigator()

const TrackerStackScreen = () => {
  return (
    <TrackerStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyProfile"
    >
      <TrackerStack.Screen name="TrackerInput" component={TrackerInput} />
      <TrackerStack.Screen name="Tracker" component={Tracker} />
    </TrackerStack.Navigator>
  )
}

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: 'Profile' }}
        component={ProfileContainer}
      />
      <Tab.Screen
        name="Feedback"
        options={{ title: 'Feedback' }}
        component={FeedbackContainer}
      />
      <Tab.Screen
        name="TrackerStack"
        options={{ title: 'Tracker' }}
        component={TrackerStackScreen}
      />
    </Tab.Navigator>
  )
}

const MainNavigator = () => {
  const token = useSelector(state => state.auth?.user?.token)

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <RootStack.Screen name="TabStack" component={TabStack} />
        </>
      ) : (
        <>
          <RootStack.Screen name="Login" component={LoginContainer} />
          <RootStack.Screen name="SignUp" component={SignUpContainer} />
          <RootStack.Screen name="Privacy" component={PrivacyContainer} />
          <RootStack.Screen name="Terms" component={TermsContainer} />
          <RootStack.Screen name="PasswordReset" component={PasswordReset} />
        </>
      )}
    </RootStack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})
