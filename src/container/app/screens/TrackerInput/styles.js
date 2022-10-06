import { StyleSheet } from 'react-native'
import * as appStyles from '../../../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.lightBlackColor,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 34,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_BOLD,
  },
  batteries: {
    borderBottomColor: 'rgba(255, 255, 255, 0.24)',
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.24)',
    borderTopWidth: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
  },
  batteryText: {
    fontSize: 16,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    marginRight: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 12,
    minHeight: 100,
  },
})
