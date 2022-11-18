import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import React, { useEffect, useRef } from 'react'

import * as appStyles from '../../util/appStyles'

import { styles } from './styles'

const windowWidth = Dimensions.get('window').width

export const MonthPicker = ({ months = [], selected, setSelected }) => {
  const scrollViewRef = useRef(null)

  const [interval, setInterval] = React.useState(1)
  const [intervals, setIntervals] = React.useState(1)
  const [width, setWidth] = React.useState(0)

  const init = width => {
    // initialise width
    scrollViewRef?.current?.scrollTo({
      x: 90 * selected?.number - 45,
      animated: true,
    })
  }

  useEffect(() => {
    scrollToIndex()
  }, [selected])

  const scrollToIndex = () => {
    console.log('scrollToIndex', selected.number)

    // setTimeout(() => {
    scrollViewRef?.current?.scrollTo({
      x: 90 * selected?.number - 45,
      animated: true,
    })
    // }, 2000)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollView}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          // setWidth(data.nativeEvent.contentSize.width)
          // setInterval(getInterval(data.nativeEvent.contentOffset.x))
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        // scrollEventThrottle={200}
        // decelerationRate="fast"
        // pagingEnabled
      >
        <View style={{ width: 150 }} />
        {months.map(month => (
          <TouchableOpacity
            key={month.number}
            style={[
              selected?.name === month.name && styles.monthSelected,
              styles.month,
            ]}
            onPress={() => setSelected(month)}
          >
            <Text
              style={[
                styles.title,
                selected?.name === month.name && styles.titleSelected,
              ]}
            >
              {month.name}
            </Text>
          </TouchableOpacity>
        ))}
        {/* <View style={{ width: 90 }} /> */}
      </ScrollView>
    </View>
  )
}
