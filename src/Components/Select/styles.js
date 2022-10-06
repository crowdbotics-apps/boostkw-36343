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
    borderBottomColor: 'rgba(255, 255, 255, 0.24)',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
    color: appStyles.WHITE_COLOR,
  },
  label: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginBottom: 0,
    color: appStyles.WHITE_COLOR,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.WHITE_COLOR,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.WHITE_COLOR,
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: appStyles.WHITE_COLOR,
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
    marginTop: 5,
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 16,
  },
})
