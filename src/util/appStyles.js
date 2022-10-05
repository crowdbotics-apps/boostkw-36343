import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen'

export const hp = heightPercentageToDP
export const wp = widthPercentageToDP

export const PRIMARY_COLOR = '#4D6A99'
export const PRIMARY_LIGHT_COLOR = '#4F98FF'

export const WHITE_COLOR = '#ffffff'
export const WHITE_0_75 = "rgba(255, 255, 255, 0.75)"
export const BLACK_COLOR = '#000'

export const TEXT_COLOR_1 = '#85889D'

export const COLOR_GRAY_1 = '#626262'
export const COLOR_GRAY_2 = '#B1B1B1'

export const BORDER_COLOR = '#91B1E178'
export const BORDER_RADIUS = 5

export const FONT_FAMILY_LIGHT = 'Montserrat-Light' //300
export const FONT_FAMILY_REGULAR = 'Montserrat-Regular' //400
export const FONT_FAMILY_MEDIUM = 'Montserrat-Medium' //500
export const FONT_FAMILY_SEMI_BOLD = 'Montserrat-SemiBold' //600
export const FONT_FAMILY_BOLD = 'Montserrat-Bold' //700
export const FONT_FAMILY_BOLD_ITALIC = 'Montserrat-BoldItalic' //700-italic

export const FONT_ORBITRON_FAMILY_BOLD = 'Orbitron-Bold'
export const FONT_ORBITRON_FAMILY_MEDIUM = 'Orbitron-Medium'
export const FONT_ORBITRON_FAMILY_REGULAR = 'Orbitron-Regular'

export const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 32,
    color: '#000',
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
})
