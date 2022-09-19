import { StyleSheet } from "react-native"
import * as appStyles from "../../../../util/appStyles"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.lightBlackColor,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  titleText: {
    fontSize: 34,
    color: appStyles.white,
    fontFamily: appStyles.FONT_FAMILY_BOLD
  }
})
