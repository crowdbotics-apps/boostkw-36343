import { View, Text, Switch } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  useGetRoofTypes,
  useGetCrews,
  useStartTracking,
} from '../../hooks/useTracker'

import { Button } from '../../../../components/Button'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import FloatingInput from '@/components/FloatingInput'
import { Select } from '@/components/Select'

import * as appStyles from '../../../../util/appStyles'
import { validateJobCode } from '@/util/helpers'
import { styles } from './styles'

const LOCATIONS = [
  { name: 'Roof', id: 'roof' },
  { name: 'Ground', id: 'ground' },
]

const VALUES = {
  job_code: '',
  customer_name: '',
  system_size: '',
  number_of_panels: '',
  number_of_arrays: '',
  location: '',
  number_of_workers: '',
  roof_type: '',
  crew: '',
}
const TrackerInput = ({ route, navigation }) => {
  const { roofTypes } = useGetRoofTypes()
  const { crews } = useGetCrews()
  const { startTracking, isLoading, error } = useStartTracking(
    onSuccessStartTracking,
  )

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.reset) {
        console.log('reset')
        setValues(VALUES)
        setShowBattery(false)
      }
    }, [route]),
  )

  const [showBattery, setShowBattery] = useState(false)
  const [values, setValues] = useState(VALUES)

  const [validation, setValidation] = useState({})

  const handleSubmitFinalValues = () => {
    let finalValues = {}
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === 'object') {
        console.log('value=>', value)
        console.log('value', value?.value)
        finalValues = { ...finalValues, ...{ [key]: value?.id } }
      } else {
        finalValues = { ...finalValues, ...{ [key]: value } }
      }
    }
    finalValues = {
      ...finalValues,
      ...{ is_battery: showBattery },
    }
    console.log('finalValues', finalValues)

    return finalValues
  }

  const verifyInput = values => {
    let errors = {}

    for (const [key, value] of Object.entries(values)) {
      console.log(`${key}: ${value}`)

      if (key === 'job_code') {
        if (!validateJobCode(value)) {
          errors = {
            ...errors,
            ...{ [key]: 'Invalid Format. Example: 123A-456BCDE' },
          }
        }
      } else if (key === 'number_of_batteries') {
        if ((value?.length < 1 || parseInt(value) == 0) && showBattery) {
          errors = {
            ...errors,
            ...{ [key]: `Invalid ${key.replace(/_/g, ' ')}` },
          }
        }
      } else if (key === 'number_of_workers') {
        if ((value?.length < 1 || parseInt(value) == 0) && showBattery) {
          errors = {
            ...errors,
            ...{ [key]: `Invalid ${key.replace(/_/g, ' ')}` },
          }
        }
      } else if (key === 'system_size') {
        if (value?.length < 1) {
          errors = {
            ...errors,
            ...{ [key]: `Invalid ${key.replace(/_/g, ' ')}` },
          }
        } else if (Number(value) > Number(30.0)) {
          errors = {
            ...errors,
            ...{ [key]: 'Sytem size should not be more than 30.00 kW' },
          }
        }
      } else if (value?.length < 1) {
        errors = {
          ...errors,
          ...{ [key]: `Invalid ${key.replace(/_/g, ' ')}` },
        }
      }
    }
    return errors
  }

  const handleSubmit = () => {
    // navigation.navigate('Tracker', { params: { id: 29 } })

    const finalValues = handleSubmitFinalValues()

    const errors = verifyInput(finalValues)
    console.log('errors verifyInput', errors)

    if (!(Object.keys(errors).length === 0)) {
      setValidation(errors)
      return
    }
    setValidation({})

    startTracking(finalValues)
  }
  const onChange = (key, value) => {
    var decimals = value.split('.')

    if (decimals.length > 1 && decimals[1] && key === 'system_size') {
      setValues({
        ...values,
        system_size: (
          Math.round((Number(value) + Number.EPSILON) * 100) / 100
        ).toString(),
      })
    } else {
      console.log('value', value)
      setValues({
        ...values,
        [key]: value,
      })
    }
  }

  const handleDropdownChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  const toggleSwitch = () => {
    setShowBattery(previousState => !previousState)
    setValues({
      ...values,
      number_of_batteries: '',
    })
  }

  function onSuccessStartTracking(data) {
    console.log('trackInfo', data)
    navigation.navigate('Tracker', { params: data })
  }

  return (
    <Layout>
      <Header title="Tracker Inputs" />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <FloatingInput
          placeholder="Job Code"
          value={values.job_code}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code || error?.response?.data?.job_code[0]}
          label="Job Code"
        />

        <FloatingInput
          placeholder="Customer Name"
          value={values.customer_name}
          onChangeText={val => onChange('customer_name', val)}
          error={validation?.customer_name}
          label="Customer Name"
        />

        <FloatingInput
          placeholder="System Size"
          value={values?.system_size}
          onChangeText={val => onChange('system_size', val)}
          error={validation?.system_size}
          label="System Size"
          showUnit={true}
          keyboardType={'decimal-pad'}
        />

        <FloatingInput
          placeholder="Number of Panels"
          value={values.number_of_panels}
          onChangeText={val => onChange('number_of_panels', val)}
          error={validation?.number_of_panels}
          label="Number of Panels"
          keyboardType={'number-pad'}
        />

        <Select
          label="Roof Type"
          items={roofTypes}
          handleChange={val => handleDropdownChange('roof_type', val)}
          selected={values?.roof_type}
          showDefault={true}
          error={validation?.roof_type}
          labelName="name"
          valueName="id"
          placeholder="Roof Type"
          showTitle={true}
          customStyleDropdown={styles.customStyleDropdown}
        />

        <FloatingInput
          placeholder="Number of Arrays"
          value={values.number_of_arrays}
          onChangeText={val => onChange('number_of_arrays', val)}
          error={validation?.number_of_arrays}
          label="Number of Arrays"
          keyboardType={'number-pad'}
        />

        <View style={styles.batteries}>
          <View style={styles.switchContainer}>
            <Text style={styles.batteryText}>Battery</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.batteryText}>
                {showBattery ? 'Yes' : 'No'}
              </Text>
              <Switch
                trackColor={{
                  false: appStyles.PRIMARY_COLOR,
                  true: 'rgba(16, 56, 235, 1)',
                }}
                thumbColor={'#fff'}
                onValueChange={toggleSwitch}
                value={showBattery}
              />
            </View>
          </View>

          {showBattery && (
            <FloatingInput
              placeholder="How Many Batteries"
              value={values.number_of_batteries}
              onChangeText={val => onChange('number_of_batteries', val)}
              error={showBattery ? validation?.number_of_batteries : ''}
              label="How Many Batteries"
              keyboardType={'number-pad'}
            />
          )}
        </View>

        <Select
          label="Select Crew"
          items={crews}
          handleChange={val => handleDropdownChange('crew', val)}
          selected={values?.crew}
          showDefault={true}
          error={validation?.crew}
          labelName="name"
          valueName="id"
          placeholder="Select Crew"
          customStyleDropdown={styles.customStyleDropdown}
          showTitle={true}
        />

        <Select
          label="Location"
          items={LOCATIONS}
          handleChange={val => handleDropdownChange('location', val)}
          selected={values?.location}
          showDefault={true}
          error={validation?.location}
          labelName="name"
          valueName="id"
          placeholder="Location"
          customStyleDropdown={styles.customStyleDropdown}
          showTitle={true}
        />
        <FloatingInput
          placeholder=""
          value={values.number_of_workers}
          onChangeText={val => onChange('number_of_workers', val)}
          error={validation?.number_of_workers}
          label={
            values?.location?.id === 'roof'
              ? 'Number Of Roof Workers'
              : values?.location?.id === 'ground'
              ? 'Number Of Ground Workers'
              : 'Number Of Workers'
          }
          keyboardType={'number-pad'}
        />

        <View style={styles.footer}>
          <Button
            buttonText="Begin Tracking"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
        {/* "Invalid Format. Example: 123A-456BCDE" */}
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default TrackerInput
