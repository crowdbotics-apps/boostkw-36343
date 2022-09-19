import { StyleSheet } from "react-native"
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen"
// const hp=heightPercentageToDP
export const hp = heightPercentageToDP
export const wp = widthPercentageToDP
export const blackColor = "#000000"
export const lightBlackColor = "#101217"
export const secondaryColor = "#FFC82F"
export const tertiaryColor = "#1C2028"
export const bottomSheetColor = "#1C2028"
export const white = "#ffffff"
export const activeColor = "#636366"
export const inActiveColor = "rgba(118, 118, 128, 0.24)"
export const dropdowncolor = tertiaryColor
export const dropdownSelectedcolor = "#363E4E"
export const formBackgroundColor = "#363E4E"

export const COLOR_GRAY_1 = "#626262"
export const COLOR_GRAY_2 = "#B1B1B1"

export const BORDER_COLOR = "#A5ABAF"
export const BORDER_RADIUS = 5

export const FONT_FAMILY_LIGHT = "Roboto-Light" //300
export const FONT_FAMILY_MEDIUM = "Roboto-Medium" //500
export const FONT_FAMILY_REGULAR = "Roboto-Regular" //400
export const FONT_FAMILY_BOLD = "Roboto-Bold" //700
// export const FONT_FAMILY_SEMI_BOLD = "Roboto-SemiBold" //600

export const styles = StyleSheet.create({
  main: {
    backgroundColor: "red",
    flex: 1
  }
})
