import { StyleSheet } from "react-native"
import * as appStyles from "../../util/appStyles"

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1
  },
  inputContainerEditable: {
    borderBottomColor: appStyles.COLOR_GRAY_1,
    borderBottomWidth: 1
  },
  input: {
    height: 40,
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,
    color: "#fff",
    width: "93%"
  },
  date: {
    height: 40,
    width: "93%",
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 18,
    color: "#fff",
    marginTop: 5
  },
  icon: {
    color: appStyles.COLOR_GRAY_2,
    fontSize: 20
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 16,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21
  },
  label: {
    fontSize: 12,
    position: "absolute",
    top: 10,
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    lineHeight: 21,color:appStyles.WHITE_COLOR
  }
})
