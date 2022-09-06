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
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: -0.32,
        lineHeight: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        backgroundColor: Colors.transparent,
        color: Colors.text,
        textColor: Colors.text,
        minHeight: 40,
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 20,
      },
      selectInput: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: -0.32,
        lineHeight: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        backgroundColor: Colors.transparent,
        color: Colors.text,
        textColor: Colors.text,
        textAlign: 'left',
      },
      textBoxInput: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: -0.32,
        lineHeight: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        color: Colors.text,
        textColor: Colors.text,
        textAlign: 'left',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12
      },
      selectInputCard: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '400',
        fontSize: 14,
        letterSpacing: -0.32,
        lineHeight: 20,
        backgroundColor: Colors.transparent,
        color: Colors.text,
        textColor: Colors.text,
        textAlign: 'left',
      },
    }),
  }
}
