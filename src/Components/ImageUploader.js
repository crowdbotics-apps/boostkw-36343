import React, { useState } from "react"
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"
import ActionSheet from "./ActionSheet"
import ImagePicker from "react-native-image-crop-picker"

const ImageUploader = ({
  onUpload,
  children,
  style,
  channel
}) => {
  const [optionsVisible, setVisible] = useState(false)

  const onPress = () => {
    ImagePicker.openPicker({
        width: 500,
        height: 500,
        mediaType: "photo",
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.5
      }).then(res => {
        console.log("Image", res)
        onUpload(res)
        setVisible(false)
      })
  }

  if (children) {
    return (
      <>
        <TouchableOpacity
          style={style ? style : styles.uploadContainer}
          onPress={() => setVisible(true)}
        >
          {children}
        </TouchableOpacity>
        <ActionSheet
          isModalVisible={optionsVisible}
          setModalVisible={setVisible}
          onPress={onPress}
          options={options}
        />
      </>
    )
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.uploadContainer}>
        <Text>Upload photo</Text>
      </TouchableOpacity>
      <ActionSheet
        isModalVisible={optionsVisible}
        setModalVisible={setVisible}
        onPress={onPress}
        options={options}
      />
    </>
  )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  uploadContainer: {
    borderRadius: 10,
    padding: 15,
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default ImageUploader
