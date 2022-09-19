import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#010A60",
    marginBottom: 30,
  },
  dropdown: {
    height: 40,
    // backgroundColor: "#010A60",
    color: appStyles.WHITE_COLOR,
    borderRadius: 7,
  },
  icon: {
    marginRight: 5,
    color: appStyles.white,
  },
  label: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginBottom: 0,
    color: appStyles.COLOR_GRAY_2,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.white,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.white,
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: appStyles.white,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    height: 46,
    justifyContent: 'center',
    paddingLeft: 20,
    // backgroundColor: appStyles.dropdowncolor,
  },
  itemActive: {
    backgroundColor: '#010A61',
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.WHITE_COLOR,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
})
