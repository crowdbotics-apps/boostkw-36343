import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"
import ImagePicker from "react-native-image-crop-picker"

const ImageUploader = ({
  onUpload,
  children,
  style,
  channel
}) => {

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
        // console.log("Image", res)
        onUpload(res)
        CloseModal()
      })
  }

  if (children) {
    return (
      <>
        <TouchableOpacity
          style={style ? style : styles.uploadContainer}
          onPress={OpenModal}
        >
          {children}
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.uploadContainer}>
        <Text>Upload photo</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default ImageUploader
