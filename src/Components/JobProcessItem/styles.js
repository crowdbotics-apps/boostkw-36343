import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 17,
    color: appStyles.WHITE_COLOR,
  },
  time: {
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    lineHeight: 14,
    color: appStyles.WHITE_0_75,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playBtn: {
    marginLeft: 10,
  },
  doneBtn: {
    marginRight: 10,
  },
})
