/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.background,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: -0.32,
        lineHeight: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        textColor: Colors.text,
        minHeight: 40,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 10,
      },
    }),
  }
}
