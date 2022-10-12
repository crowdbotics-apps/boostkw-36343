import React, { useState } from 'react'
import { Platform, Text, View } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import DateModal from '../DateModal'
import { styles } from './styles'

const TimePicker = ({ visible, value, onChange, onClose }) => {
  const handleChange = (event, dateSelected) => {
    onChange(dateSelected)
  }

  if (!visible) return null

  return (
    <RNDateTimePicker
      mode="time"
      value={value}
      // value={new Date()}
      onChange={handleChange}
      textColor="light"
      display="spinner"
      minuteInterval={1}
      is24Hour={true}
      themeVariant="dark"
      testID="dateTimePicker"
      style={styles.picker}
    />
  )
}

export default TimePicker
