import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Modalize } from 'react-native-modalize';
import FastImage from "react-native-fast-image"

const FeedbackAction = ({ onPress, modalRef, icon, buttonStyle, children}) => (
  <Modalize
    ref={modalRef}
    snapPoint={320}
    modalHeight={380}
    modalStyle={styles.modal}
  >
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
          <View style={
                {
                  flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center" ,
                  borderRadius: 150 / 2,
                  height: 99, 
                  width: 99,
                  borderWidth: 1,
                  borderColor: '#ffffff',
                  marginVertical: 15,
                }}>
          <FastImage
              style={[{width: 72, height: 72, padding: 12}]}
              source={icon}
          />
          </View>
          <Text style={styles.modalTitle}>Thank you for participating in our Pilot Program! You rock - keep up the good work!</Text>
          <TouchableOpacity
            style={[buttonStyle, { width: '90%', marginVertical: 20 }]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>{"Got it"}</Text>
        </TouchableOpacity>
          { children }
    </View>
  </Modalize>
)


const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: "#fff",
    lineHeight: 20,
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
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: "#FFFFFF",
    lineHeight: 24,
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

export default FeedbackAction
