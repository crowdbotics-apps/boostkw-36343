import React, { useState } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Text,
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
  errorValue,
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
  const { Common, Layout, Images, Colors, Fonts } = useTheme()

  console.log(error)
  return (
    <View style={[Layout.column]}>
      <View style={styles.body}>
          <TextInput
            style={
              [
                Layout.fill, 
                Common.textInput, 
                { width: password ? "85%" : "100%"},
                error && { borderColor: Colors.error }
            
              ]
            }
            placeholder={placeholder}
            secureTextEntry={hide}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
            onChangeText={onChangeText}
            color={style ? style.color : '#ffffff'}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : "#ffffff"
            }
            value={value}
            keyboardType={type}
          />
          {password ? (
            <TouchableOpacity style={[Common.textInput, error && { borderColor: Colors.error }]} onPress={() => setHide(!hide)}>
              {(style && style.color == "#000000") ||
              (style && style.color == "#000") ||
              (hideColor == 'black') ||
              icon ||
              (style && style.color == "black") ? (
                <FastImage
                  style={styles.iconPass}
                  source={icon ? icon : hide ? Images.passHide : Images.passShow}
                />
              ) : (
                <FastImage
                  style={styles.iconPass}
                  source={hide ? Images.passHideWhite : Images.passShowWhite}
                />
              )}
            </TouchableOpacity>
          ) : null}
      </View>
      {
        error && 
        <View>
          <Text style={[Fonts.errorText]}>{errorValue}</Text>
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  iconPass: {
    marginTop: 10,
    width: 18,
    height: 18,
    marginRight: 10,
    padding: 12
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
})

export default Input
