import { StyleSheet } from "react-native"
import * as appStyles from "../../util/appStyles"

export const styles = StyleSheet.create({
  container: {
    height: 41,
    backgroundColor: appStyles.white,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: appStyles.WHITE_COLOR
  },
  leftIcon: {
    marginRight:10
  }
})
