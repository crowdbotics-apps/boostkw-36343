import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

export const Header = ({ title = '' }) => {
  return (
    <View style={styles.container}>
      <View />
      <Text style={styles.title}>{title}</Text>
      <View />
    </View>
  )
}
