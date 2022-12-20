import { View, Text } from "react-native"
import React from "react"
import * as Progress from "react-native-progress"

import * as appStyles from '../../util/appStyles'
import { styles } from "./styles"

export const ListEmptyComponent = ({
  listEmptyComponent = "Empty list",
  isLoading = false
}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Progress.Circle
          size={30}
          indeterminate={true}
          color={appStyles.PRIMARY_COLOR}
        />
      ) : (
        <Text style={styles.listEmptyText}>{listEmptyComponent}</Text>
      )}
    </View>
  )
}
