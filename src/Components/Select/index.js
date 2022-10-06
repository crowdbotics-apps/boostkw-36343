import React, { useState } from 'react'
import { Text, View } from 'react-native'
// import EIcon from "react-native-vector-icons/Entypo"
import { Dropdown } from 'react-native-element-dropdown'

import * as appStyles from '../../util/appStyles'
import ChevronDown from '../../Assets/svg/chevron_down'
import { styles } from './styles'

export const Select = ({
  label = 'label',
  placeholder = 'Select',
  items = [],
  selected,
  labelName,
  valueName,
  handleChange,
  error = '',
  customStyleDropdown = {},
  showTitle = true,
}) => {
  const [isFocus, setIsFocus] = useState(false)

  console.log('items', items)

  return (
    <View style={{ ...styles.container }}>
      {showTitle ? <Text style={styles.label}>{label}</Text> : null}
      <Dropdown
        style={[styles.dropdown, customStyleDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{
          backgroundColor: '#010A60',
          borderWidth: 0,
          // borderRadius: 7,
        }}
        iconStyle={styles.iconStyle}
        data={items}
        maxHeight={250}
        placeholder={placeholder}
        labelField={[labelName]}
        valueField={[valueName]}
        renderItem={item => (
          <View
            style={[
              styles.item,
              selected?.[valueName] === item?.[valueName] && styles.itemActive,
            ]}
          >
            <Text style={styles.itemLabel}>{item?.[labelName]}</Text>
          </View>
        )}
        value={selected?.[valueName]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleChange(item)
          setIsFocus(false)
        }}
        renderRightIcon={() => (
          <>
            <ChevronDown height={24} width={24} />
          </>
        )}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}
