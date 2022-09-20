import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native'
import React, { forwardRef, useRef } from 'react'

import * as appStyles from '../../util/appStyles'
import { styles } from './styles'

export const FloatingInput = (props, ref) => {
  const {
    placeholder = '',
    onChangeText = () => {},
    showUnit = false,
    secureTextEntry = false,
    value = '',
    error = '',
    label = '',
    editable = true,
    autoCapitalize = 'sentences',
    keyboardType = 'default',
    returnKeyType = 'next',
    onSubmitEditing = () => {},
  } = props

  const labelAnim = useRef(new Animated.Value(0)).current
  const onFocus = e => {
    Animated.spring(labelAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }
  const onBlur = () => {
    Animated.spring(labelAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start()
  }

  return (
    <View style={[styles.container]}>
      {label?.length > 0 && value?.length == 0 ? (
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [
                {
                  translateY: labelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -23],
                  }),
                },
              ],
            },
            {
              fontSize: labelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              color: appStyles.WHITE_COLOR,
              fontFamily: labelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              fontFamily: appStyles.FONT_FAMILY_MEDIUM,
            },
          ]}
        >
          {label}
        </Animated.Text>
      ) : null}

      {label?.length > 0 && value?.length > 0 ? (
        <Text
          style={[
            styles.label,
            { top: -13, fontSize: 12, color: appStyles.WHITE_COLOR },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          // placeholder={placeholder}
          style={[styles.input]}
          placeholderTextColor={appStyles.WHITE_COLOR}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          // editable={editable}
          selectTextOnFocus={editable}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
        />
        {showUnit && value ? <Text style={[styles.unit]}>kW</Text> : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}
export default forwardRef(FloatingInput)
