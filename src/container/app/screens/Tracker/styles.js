import { StyleSheet } from 'react-native'
import * as appStyles from '../../../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemLabelValue: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginVertical: 5,
  },
  value: {
    fontSize: 14,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginVertical: 3,
  },
  infoPlatform: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  timeSpent: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginVertical: 20,
  },
  jobProcess: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginVertical: 20,
  },
  header: {
    borderBottomColor: appStyles.COLOR_GRAY_2,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  hours: {
    fontSize: 14,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  cancel: {
    fontSize: 14,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_SEMI_BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
})
