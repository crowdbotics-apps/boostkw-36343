import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BackIcon from '../../Assets/svg/back'
import SearchIcon from '../../Assets/svg/search'
import { styles } from './styles'

export const Header = ({
  title = '',
  onPress = () => {},
  showSearch = false,
  showBack = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 24,
        }}
      >
        {showBack && <BackIcon width={24} height={24} />}
        {showSearch && <SearchIcon width={24} height={24} />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: 24,
        }}
      />
    </View>
  )
}
