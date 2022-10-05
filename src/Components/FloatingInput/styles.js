import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.24)',
    borderBottomWidth: 0.5,
  },
  input: {
    height: 40,
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 21,
    color: '#fff',
    width: '90%',
  },
  timeInput: {
    height: 40,
    width: '90%',
  },
  timeValue: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 21,
    color: '#fff',
    marginTop: 10,
  },
  inputError: {
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
  },
  unit: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 18,
    color: '#fff',
    marginTop: 5,
  },
  icon: {
    color: appStyles.COLOR_GRAY_2,
    fontSize: 20,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 16,
  },
  label: {
    fontSize: 12,
    position: 'absolute',
    top: 10,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.WHITE_COLOR,
  },
})
