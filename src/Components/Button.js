import React from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native"

const Button = ({
  children,
  name,
  onPress,
  color,
  backgroundColor,
  borderColor,
  styleCustom,
  size,
  iconLeft,
  loading,
  disabled
}) => (
  <TouchableOpacity
    style={[
      styles.body,
      { backgroundColor, borderWidth: borderColor ? 1 : null, borderColor },
      styleCustom
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#ffffff" />
    ) : iconLeft ? (
      <>
        {children}
        <Text style={[styles.name, { color }, size]}>{name}</Text>
      </>
    ) : (
      <>
        <Text style={[styles.name, { color }, size]}>{name}</Text>
        {children}
      </>
    )}
  </TouchableOpacity>
)
const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center"
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },
  body: {
    justifyContent: "center",
    borderRadius: 20,
    height: 60
  }
})

export default React.memo(Button)
