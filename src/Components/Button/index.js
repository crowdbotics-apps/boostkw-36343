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
  isDisabled = false,
}) => {
  return (
    <Pressable
      onPress={isDisabled ? () => {} : onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor:
            pressed && !isDisabled
              ? 'rgba(16, 56, 235, 0.7)'
              : isDisabled
              ? 'rgba(16, 56, 235, 0.4)'
              : isDisabled && pressed
              ? 'rgba(16, 56, 235, 0.4)'
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
