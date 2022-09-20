import React from 'react'
import { Text, View } from 'react-native'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { styles } from './styles'

const Tracker = ({ route, navigation }) => {
  const { location } = route.params
  return (
    <Layout>
      <Header title={location === 'roof' ? 'Roof tracker' : 'Ground tracker'} />
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: '#fff', flex: 1 }}>
          Job Process
        </Text>

        <Button
          buttonText="Close Project"
          onPress={() => navigation.navigate('TrackerInput', { reset: true })}
        />
      </View>
    </Layout>
  )
}

export default Tracker
