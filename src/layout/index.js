import { View, SafeAreaView, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import React from 'react'

import * as appStyles from '../util/appStyles'
import { styles } from './styles'

export const Layout = ({
  customStyle,
  children,
  barStyle = 'light-content',
}) => {
  return (
    <>
      <LinearGradient
        colors={['#000A62', '#00063C']}
        style={styles.contentGradient}
      />

      <StatusBar barStyle={barStyle} />
      <SafeAreaView style={{ flex: 0 }} />
      <SafeAreaView
        style={[
          {
            flex: 1,
          },
          customStyle && customStyle,
        ]}
      >
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
            },
            customStyle && customStyle,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
    </>
  )
}
