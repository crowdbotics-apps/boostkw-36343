import { View, Dimensions, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import React from 'react'

import { styles } from './styles'

const deviceWidth = Dimensions.get('window').width

export const FullModal = ({ visible, setVisible = () => {}, children }) => {
  return (
    <Modal
      isVisible={visible}
      backdropColor="rgba(0,0,0,0.6)"
      useNativeDriverForBackdrop={true}
      deviceWidth={deviceWidth}
      style={styles.container}
      animationIn="zoomInUp"
      animationOut="zoomOutUp"
    >
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <LinearGradient
            colors={['#000A62', '#00063C']}
            style={styles.contentGradient}
          />
          <SafeAreaView />

          <View style={styles.children}>{children}</View>
          {/* <SafeAreaView /> */}
        </View>
      </View>
    </Modal>
  )
}
