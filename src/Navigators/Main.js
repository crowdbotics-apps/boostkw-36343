import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      tabBarStyle: {
        backgroundColor: '#1E1E1E',
      },
    }}
    >
      <Tab.Screen
        name="Home"
        component={LoginContainer}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
