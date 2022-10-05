import { View, Modal as MModal } from "react-native"
import React from "react"
import SwipeableModal from "../SwipeableModal"

const DateModal = ({ visible, children, onClose, onPressBtn, toggleModal }) => {
  return (
    <SwipeableModal
      visible={visible}
      onPressBtn={onClose}
      handleCancel={onClose}
      buttonText="Done"
      swipeDirection="none"
    >
      <View>{children}</View>
    </SwipeableModal>
  )
}

export default DateModal
