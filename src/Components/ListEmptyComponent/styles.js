import { StyleSheet } from "react-native"
import * as appStyles from '../../util/appStyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: appStyles.hp(60),
    justifyContent: "center",
    alignItems: "center"
  },
  listEmptyText: {
    color: appStyles.TEXT_COLOR_1,
    fontSize: 20,
    fontFamily: appStyles.FONT_FAMILY_SEMI_BOLD,
    lineHeight: 24,
    width: appStyles.wp(60),
    textAlign: "center"
  }
})
