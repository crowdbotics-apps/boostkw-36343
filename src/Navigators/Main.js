import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ProfileContainer, FeedbackContainer, TrackerContainer, DashboardContainer } from '@/Containers'
import FastImage from "react-native-fast-image"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@/Hooks'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = ({ navigation }) => {
  const { Common, Fonts, Images } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        tabBarActiveTintColor: '#4F98FF',
        tabBarInactiveTintColor: "#4D6A99",
        tabBarActiveBackgroundColor: 'rgba(0,0,0,0)',
        tabBarInactiveBackgroundColor: 'rgba(0,0,0,0)',
        borderTopColor: "rgba(255, 255, 255, 0.12)",
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
          height: 65,
        },
        tabBarIconStyle: {
          marginTop: 10
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Regular',
          fontWeight: '400',
          fontSize: 12,
          letterSpacing: -0.32,
          lineHeight: 20,
          // marginTop: 15
        }
    }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardContainer}
        navigation={navigation}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ focused, color, size }) => (
            <FastImage
                  style={{ width: 44 , height: 44}}
                  source={ focused ?  Images.dashboard : Images.dashboardInactive}
              />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        navigation={navigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <FastImage
                  style={{ width: 44 , height: 44}}
                  source={ focused ?  Images.profile : Images.profileInactive}
              />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackContainer}
        navigation={navigation}
        options={{
          tabBarLabel: 'Feedback',
          tabBarIcon: ({ focused, color, size }) => (
            <FastImage
                  style={{ width: 44 , height: 44}}
                  source={ focused ?  Images.feedback : Images.feedbackInactive}
              />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerContainer}
        navigation={navigation}
        options={{
          tabBarLabel: 'Tracker',
          tabBarIcon: ({ focused, color, size }) => (
            <FastImage
                  style={{ width: 44 , height: 44}}
                  source={ focused ?  Images.tracker : Images.trackerInactive}
              />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator