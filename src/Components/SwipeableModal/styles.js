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
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1,
  },
  content: {
    minHeight: appStyles.hp(35),
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
  },
  children: { paddingHorizontal: 20, paddingVertical: 10 },
  buttonDanger: { backgroundColor: 'red', color: '#fff' },
  confirmMesssage: {
    fontSize: 22,
    color: appStyles.PRIMARY_DARK_COLOR,
    fontFamily: appStyles.FONT_FAMILY_BOLD,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancel: {
    fontSize: 18,
    color: appStyles.WHITE_COLOR,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginTop: 10,
  },
})
