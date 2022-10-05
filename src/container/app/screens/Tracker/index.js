import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import dayjs from 'dayjs'

import ArraysIcon from '../../../../Assets/svg/arrays'
import PanelsIcon from '../../../../Assets/svg/panels'
import RoofTypeIcon from '../../../../Assets/svg/roof_type'
import SwipeableModal from '@/components/SwipeableModal'
import FloatingInput from '@/components/FloatingInput'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import TimePicker from '@/components/TimePicker'
import { JobProcessItem } from '@/components/JobProcessItem'
import { styles } from './styles'

const INFO = {
  job_code: '123D-431DJFK',
  customer_name: 'Arvin Grey',
  system_size: '12.2Kw',
  number_of_panels: '2',
  number_of_arrays: '3',
  location: '8',
  number_of_workers: '5',
  roof_type: 'Tile-S',
  crew: '21',
}

const Tracker = ({ route, navigation }) => {
  const trackInfo = route.params?.trackInfo || INFO

  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [values, setValues] = useState({})
  const [panelWiring, setPanelWiring] = useState({
    title: 'Panel Wiring/Upgrades',
  })
  const [validation, setValidation] = useState({})

  const handleDropdownChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!')
  //     getTime()
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  const getTime = () => {
    const startTime = new Date('Oct 5, 2022 15:37:25').getTime()
    const now = new Date().getTime()

    const distance = now - startTime

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    console.log(startTime)
    console.log('days', days)
    console.log('minutes', minutes)
    console.log('seconds', seconds)
    console.log('hours', hours)
    let time = hours + ':' + minutes + ':' + seconds
    setTime(time)
  }

  return (
    <Layout>
      <Header
        title={
          trackInfo?.location === 'roof' ? 'Roof tracker' : 'Ground tracker'
        }
      />
      <ScrollView style={styles.container}>
        <View style={styles.infoPlatform}>
          <View>
            <Text style={styles.label}>Customer Name</Text>
            <Text style={styles.value}>{trackInfo.customer_name}</Text>
          </View>

          <View>
            <Text style={styles.label}>Job Code</Text>
            <Text style={styles.value}>{trackInfo.job_code}</Text>
          </View>

          <View>
            <Text style={styles.label}>System Size</Text>
            <Text style={styles.value}>{trackInfo.system_size}</Text>
          </View>
        </View>

        <Text style={styles.timeSpent}>Time Spent: {time} hrs</Text>

        <Button
          buttonText="Stop"
          onPress={() => navigation.navigate('TrackerInput', { reset: true })}
        />

        <View style={styles.infoPlatform}>
          <View style={styles.itemLabelValue}>
            <PanelsIcon height={24} width={24} />
            <Text style={styles.label}>Panels</Text>
            <Text style={styles.value}>{trackInfo.number_of_panels}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <RoofTypeIcon height={24} width={24} />
            <Text style={styles.label}>Roof Type</Text>
            <Text style={styles.value}>{trackInfo.roof_type}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <ArraysIcon height={24} width={24} />
            <Text style={styles.label}>Arrays</Text>
            <Text style={styles.value}>{trackInfo.number_of_arrays}</Text>
          </View>
        </View>

        <Text style={styles.jobProcess}>Job Process</Text>

        <JobProcessItem jobItem={panelWiring} />

        <JobProcessItem title="Equipment Mounting" />

        <JobProcessItem title="Equipment Wiring" />

        <JobProcessItem title="Conduit" />

        <JobProcessItem title="Commissioning" />

        <Button
          buttonText="Close Project"
          onPress={() => navigation.navigate('TrackerInput', { reset: true })}
        />

        <SwipeableModal
          visible={showEdit}
          buttonText="Save"
          showCancel
          title="Equipment Mounting"
        >
          <FloatingInput
            placeholder="Start Time"
            value={values.start_time}
            onChangeText={val => onChange('start_time', val)}
            label="Start Time"
            time={true}
            onPressTime={() => setShowStartTimePicker(true)}
          />

          <FloatingInput
            placeholder="End Time"
            value={values.end_time}
            onChangeText={val => onChange('end_time', val)}
            label="End Time"
            time={true}
            onPressTime={() => setShowEndTimePicker(true)}
          />
        </SwipeableModal>

        <TimePicker
          value={date || new Date()}
          onChange={val => {
            const date = dayjs(val).format('h:mm:ss A')
            setDate(val)
            handleDropdownChange('start_time', date)
            console.log('val', typeof dayjs(val).format('h:mm:ss A'))
          }}
          visible={showStartTimePicker}
          onClose={() => setShowStartTimePicker(false)}
        />

        <TimePicker
          value={date || new Date()}
          onChange={val => {
            const date = dayjs(val).format('h:mm:ss A')
            setDate(val)
            handleDropdownChange('end_time', date)
            console.log('val', typeof dayjs(val).format('h:mm:ss A'))
            console.log('val', val)
          }}
          visible={showEndTimePicker}
          onClose={() => setShowEndTimePicker(false)}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </Layout>
  )
}

export default Tracker
