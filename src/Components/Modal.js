import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native"
import Modal from "react-native-modal"

const PopupModal = ({ modalVisible, setModalVisible, children, carousel }) => (
  <Modal
    avoidKeyboard={true}
    style={{ margin: 0, width: "100%" }}
    isVisible={modalVisible}
    onBackdropPress={() => setModalVisible(false)}
  >
    <SafeAreaView>
      <View>
        {carousel ? (
          <View>{children}</View>
        ) : (
          <TouchableOpacity style={styles.modalView} activeOpacity={1}>
            <View>{children}</View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  </Modal>
)

const styles = StyleSheet.create({
  modalView: {
    margin: -20,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})

export default PopupModal
