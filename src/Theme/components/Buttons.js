import { StyleSheet } from 'react-native'

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.buttonBackground,
  }
  const rounded = {
    ...base,
    borderRadius: 8,
  }

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.buttonBackground,
      borderWidth: 2,
      borderColor: Colors.transparent,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.buttonBackground,
      borderWidth: 2,
      borderColor: Colors.transparent,
    },
  })
}
