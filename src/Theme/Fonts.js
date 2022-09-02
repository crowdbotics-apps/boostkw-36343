/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textButton: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: 'Montserrat-Regular',
      color: Colors.text,
      lineHeight: 20,
    },
    textButtonSmall: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Montserrat-Regular',
      color: Colors.text,
      lineHeight: 18,
    },
    textNormal: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Montserrat-Regular',
      color: Colors.text,
      lineHeight: 20,
    },
    textGray: {
      color: Colors.textOffWhite
    },
    titleBold: {
      fontSize: 28,
      fontFamily: 'Orbitron-Regular',
      fontWeight: '400',
      color: Colors.text,
      lineHeight: 41,
      letterSpacing: 0.374,
    },
    titleBoldTerms: {
      fontSize: 24,
    },
    fontBold: {
      fontWeight: '600',
    },
    errorText: {
      fontSize: 14,
      fontWeight: '400',
      fontStyle: 'normal',
      fontFamily: 'Roboto-Regular',
      color: Colors.error,
      lineHeight: 20,
      letterSpacing: -0.32,
    },
    textTerms: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'Montserrat-Regular',
      color: Colors.text,
      lineHeight: 18,
    },
    labelText: {
      fontSize: 12,
      fontWeight: '400',
      fontStyle: 'normal',
      fontFamily: 'Montserrat-Regular',
      color: 'rgba(255, 255, 255, 0.75)',
      letterSpacing: -0.078,
    }
  })
}
