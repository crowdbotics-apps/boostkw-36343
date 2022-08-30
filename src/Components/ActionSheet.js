import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"

const ActionSheet = ({ options, onPress, isModalVisible, setModalVisible }) => (
  <Modal
    avoidKeyboard={true}
    transparent={true}
    visible={isModalVisible}
    animationType="fade"
    onRequestClose={() => setModalVisible(false)}
  >
    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      activeOpacity={0.8}
      style={styles.modal}
    >
      <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
        <View style={{ padding: 20, width: "100%" }}>
          <Text style={styles.modalTitle}>Options:</Text>
          {options.map((o, i) => (
            <Text key={o} onPress={() => onPress(o, i)} style={styles.option}>
              {o}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
)
const styles = StyleSheet.create({
  buttonText: {
    // color: colors.blue,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 10
  },
  button: {
    padding: 10,
    // borderColor: colors.black,
    flex: 1,
    fontSize: 12
  },
  containerButton: {
    borderTopWidth: 1,
    // borderColor: colors.black,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalInput: {
    // color: colors.white
  },
  modalTitle: {
    // color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
    padding: 8,
    textAlign: "center"
  },
  modalContainer: {
    // backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 15
  },
  modal: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "center"
  },
  option: {
    // color: colors.black,
    marginTop: 20,
    padding: 10,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 16
  }
})

export default ActionSheet
