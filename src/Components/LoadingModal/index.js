import { Modal, View } from "react-native"
import React from "react"
import * as Progress from "react-native-progress"

import { styles } from "./styles"

export const LoadingModal = ({ isLoading = false }) => {
  return (
    <Modal visible={isLoading} style={styles.container} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={["#fff"]}
            duration={500}
          />
        </View>
      </View>
    </Modal>
  )
}
