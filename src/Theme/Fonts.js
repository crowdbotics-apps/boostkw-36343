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
      lineHeight: 40,
      letterSpacing: 0.374,
    },
    fontBold: {
      fontWeight: '600',
    }
  })
}
