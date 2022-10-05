import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import React from 'react'

import ModalDash from '../../Assets/svg/modal-dash'
// import Logout from '../../assets/svg/logout'
// import SuccessIcon from '../../assets/svg/success'
import { Button } from '../Button'
import { styles } from './styles'

const deviceWidth = Dimensions.get('window').width

const SwipeableModal = ({
  visible,
  children,
  onClose,
  title = '',
  confirmMesssage = '',
  buttonText = '',
  onPressBtn = () => {},
  showCancel = false,
  // buttonDanger = false,
  handleCancel = () => {},
  showLogout = false,
  isSuccess = false,
  swipeDirection = 'down',
}) => {
  return (
    <Modal
      isVisible={visible}
      swipeDirection={swipeDirection}
      onSwipeComplete={onClose}
      backdropColor="rgba(0,0,0,0.6)"
      useNativeDriverForBackdrop={true}
      deviceWidth={deviceWidth}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <LinearGradient
            colors={['#000A62', '#00063C']}
            style={styles.contentGradient}
          />
          <View style={styles.header}>
            <ModalDash />
          </View>

          {isSuccess && (
            <View style={styles.icon}>
              <SuccessIcon />
            </View>
          )}

          <View style={styles.children}>
            {title ? <Text style={styles.title}>{title}</Text> : null}

            {confirmMesssage ? (
              <Text style={styles.confirmMesssage}>{confirmMesssage}</Text>
            ) : null}
            {children}

            <Button
              buttonText={buttonText}
              onPress={onPressBtn}
              // customStyle={[buttonDanger && styles.buttonDanger]}
            />

            {showCancel && (
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
          <SafeAreaView />
        </View>
      </View>
    </Modal>
  )
}

export default SwipeableModal
