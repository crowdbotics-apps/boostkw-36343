import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  containerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  month: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    // backgroundColor: 'red',
  },
  monthSelected: {
    borderBottomColor: '#338AF4',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.55)',
    marginBottom: 7,
    textAlign: 'center',
  },
  titleSelected: {
    color: '#338AF4',
  },
})
