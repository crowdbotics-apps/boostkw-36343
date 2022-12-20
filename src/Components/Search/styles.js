import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flex: 1 },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 17,
    color: appStyles.WHITE_COLOR,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    height: 44,
    borderRadius: 24,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  jobItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: 20,
    padding: 10,
    borderRadius: 7,
  },
  code: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 17,
    color: appStyles.WHITE_COLOR,
    marginBottom: 7,
  },
  name: {
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 15,
    color: appStyles.WHITE_0_75,
  },
  status: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 15,
    color: appStyles.WHITE_0_75,
  },
  statusValue: {
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 15,
    color: 'red',
    marginLeft: 10,
  },
  statusActive: {
    color: 'green',
  },
})
