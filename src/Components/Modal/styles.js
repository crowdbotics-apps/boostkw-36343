import { StyleSheet } from 'react-native'
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  contentGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  content: {
    minHeight: appStyles.hp(20),
    width: '80%',
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
  },
  children: {
    padding: 20,
  },
  cancel: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
  },
})
