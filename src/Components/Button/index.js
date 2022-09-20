import { View, Text, Pressable } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

import * as appStyles from '../../util/appStyles'
import { styles } from './styles'

export const Button = ({
  buttonText = '',
  onPress = () => {},
  customStyle = {},
  isLoading = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? 'rgba(16, 56, 235, 0.7)'
            : 'rgba(16, 56, 235, 1)',
        },
        customStyle,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <Progress.Circle size={20} indeterminate={true} color="#fff" />
      ) : (
        <Text style={[styles.buttonText, customStyle]}>{buttonText}</Text>
      )}
    </Pressable>
  )
}
