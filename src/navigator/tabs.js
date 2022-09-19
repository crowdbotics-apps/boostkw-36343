import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import DashboardActiveIcon from '../Assets/svg/dashboard_active'
import DashboardIcon from '../Assets/svg/dashboard'

import FeedbackActiveIcon from '../Assets/svg/feedback_active'
import FeedbackIcon from '../Assets/svg/feedback'

import TrackerActiveIcon from '../Assets/svg/tracker_active'
import TrackerIcon from '../Assets/svg/tracker'

import ProfileActiveIcon from '../Assets/svg/profile_active'
import ProfileIcon from '../Assets/svg/profile'

import * as appStyles from '../util/appStyles'

export function TabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 90,
        backgroundColor: '#00063C',
        borderTopColor: '#FFFFFF1F',
        borderTopWidth: 1,
      }}
    >
      {/* <LinearGradient
        colors={['#000A62', '#00063C']}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      /> */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const dashboard = isFocused ? (
          <DashboardActiveIcon height={24} width={24} />
        ) : (
          <DashboardIcon height={24} width={24} />
        )

        const feedback = isFocused ? (
          <FeedbackActiveIcon height={24} width={24} />
        ) : (
          <FeedbackIcon height={24} width={24} />
        )

        const profile = isFocused ? (
          <ProfileActiveIcon height={24} width={24} />
        ) : (
          <ProfileIcon height={24} width={24} />
        )

        const tracker = isFocused ? (
          <TrackerActiveIcon height={24} width={24} />
        ) : (
          <TrackerIcon height={24} width={24} />
        )

        const Icon =
          label === 'Dashboard'
            ? dashboard
            : label === 'Feedback'
            ? feedback
            : label === 'Profile'
            ? profile
            : tracker

        const onPress = () => {
          if (!isFocused) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={label}
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 34,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {Icon}
              </View>
              <View>
                <Text
                  style={{
                    color: isFocused
                      ? appStyles.PRIMARY_LIGHT_COLOR
                      : appStyles.PRIMARY_COLOR,
                    padding: 4,
                    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
                    fontSize: 12,
                    lineHeight: 9,
                  }}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}
