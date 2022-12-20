import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: appStyles.FONT_ORBITRON_FAMILY_REGULAR,
    lineHeight: 41,
    color: appStyles.WHITE_COLOR,
  },
})
