import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 30,
    borderRadius: 6,
  },
  timeSpent: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginVertical: 35,
  },
  jobProcess: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    borderBottomColor: appStyles.COLOR_GRAY_2,
    borderBottomWidth: 0.2,
    marginBottom: 20,
    paddingBottom: 10,
  },
  processes: {
    marginBottom: 30,
  },
  processTitle: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 17,
    color: appStyles.WHITE_COLOR,
    marginBottom: 7,
  },
  processTime: {
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 15,
    color: appStyles.WHITE_0_75,
  },
  jobProcessItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
})
