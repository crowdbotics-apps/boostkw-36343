import React, { useState } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from "react-native"
import FastImage from "react-native-fast-image"
import { useTheme } from '@/Hooks'

const Input = ({
  onChangeText,
  value,
  placeholder,
  password=false,
  error,
  type,
  style,
  placeholderTextColor,
  icon,
  textAlignVertical,
  multiline,
  numberOfLines,
  hideColor,
}) => {
  const [hide, setHide] = useState(password)
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  return (
    <View style={styles.body}>
        <TextInput
          style={[styles.input, { width: password ? "85%" : "100%" }]}
          placeholder={placeholder}
          secureTextEntry={hide}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          onChangeText={onChangeText}
          color={style ? style.color : '#000000'}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : "black"
          }
          value={value}
          keyboardType={type}
        />
        {password ? (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {(style && style.color == "#000000") ||
            (style && style.color == "#000") ||
            (hideColor == 'black') ||
            (style && style.color == "black") ? (
              <FastImage
                style={styles.iconPass}
                source={hide ? Images.passHide : Images.passShow}
              />
            ) : (
              <FastImage
                style={styles.iconPass}
                source={icon ? icon : Images.passHideWhite}
              />
            )}
          </TouchableOpacity>
        ) : null}
    </View>
  )
}
const styles = StyleSheet.create({
  iconPass: {
    marginTop: 10,
    width: 22,
    height: 22,
    marginRight: 20,
    padding: 12
  },
  shadowStyle: {
    borderRadius: 12
  },
  input: {
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 16,
    fontWeight: "600",
    color: '#000000',
    fontFamily: "Roboto-Regular",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    height: 55,
  }
})

export default Input
