import React, { useState } from 'react'
import { Platform, Text, View } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import DateModal from '../DateModal'
import { styles } from './styles'

const TimePicker = ({ visible, value, onChange, onClose }) => {
  const handleChange = (event, dateSelected) => {
    if (Platform.OS === 'android') {
      onClose()
    }
    onChange(dateSelected)
  }

  const getDateTimePicker = () => (
    <RNDateTimePicker
      mode="time"
      value={value}
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

  if (Platform.OS === 'ios') {
    return (
      <DateModal
        visible={visible}
        submitText="Done"
        cancelText="Cancel"
        onSubmit={onClose}
        onClose={onClose}
      >
        {getDateTimePicker()}
      </DateModal>
    )
  }

  return visible ? getDateTimePicker('date') : null
}

export default TimePicker
