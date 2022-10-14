import { View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import { default as MModal } from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'

import { styles } from './styles'

export const Modal = ({ visible = false, children }) => {
  return (
    <MModal
      isVisible={visible}
      backdropColor="rgba(0,0,0,0.6)"
      useNativeDriverForBackdrop={true}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <LinearGradient
            colors={['#000A62', '#00063C']}
            style={styles.contentGradient}
          />
          {/* <View style={styles.header}> */}
          <View style={styles.children}>{children}</View>

          {/* <ModalDash /> */}
          {/* </View> */}
        </View>
      </View>
    </MModal>
  )
}
