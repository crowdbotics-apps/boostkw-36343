import { StyleSheet } from 'react-native'
import * as appStyles from '../../../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatar: {
    height: appStyles.wp(30),
    width: appStyles.wp(30),
    borderRadius: appStyles.wp(30),
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignSelf: 'center',
    marginVertical: 0,
  },
  intro: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: appStyles.FONT_ORBITRON_FAMILY_REGULAR,
    lineHeight: 22,
    color: appStyles.WHITE_COLOR,
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  jobTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 10,
  },
  branch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  crew: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: 'rgba(255, 255, 255, 0.08)',
    borderLeftWidth: 1,
    width: '50%',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#fff',
    marginVertical: 5,
  },
  workStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 10,
  },
  workStatItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  empty: {
    height: appStyles.hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  averageKW: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginVertical: 10,
  },
  averageKWValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: appStyles.FONT_ORBITRON_FAMILY_REGULAR,
    textAlign: 'center',
  },
  averageKWLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: appStyles.FONT_ORBITRON_FAMILY_REGULAR,
    textAlign: 'center',
    marginLeft: 10,
  },
})
