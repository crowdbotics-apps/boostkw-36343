import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Modalize } from 'react-native-modalize';
import FastImage from "react-native-fast-image"

const ActionSheet = ({ onPress, modalRef, icon }) => (
  <Modalize
    ref={modalRef}
    snapPoint={300}
    modalHeight={86}
    modalStyle={styles.modal}
  >
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.modalContainer}>
        <View style={{ flex: 1, flexDirection: "row",justifyContent: "center", alignItems: "center" }}>
          <FastImage
              style={[{width: 16, height: 16}]}
              source={icon}
          />
          <Text style={styles.modalTitle}>Open photo library</Text>
        </View>
    </TouchableOpacity>
  </Modalize>
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
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: "#FFF",
    lineHeight: 20,
    fontWeight: "500",
    padding: 8,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 15
  },
  modal: {
    padding: 15,
    backgroundColor: "#010A61",
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
