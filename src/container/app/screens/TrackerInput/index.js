import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input, SelectItem } from '@/components'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import FloatingInput from '@/components/FloatingInput'
import { useGetRoofTypes } from '../../hooks/useTracker'

import { styles } from './styles'
import { Select } from '@/components/Select'

const TrackerInput = () => {
  const { roofTypes } = useGetRoofTypes()
  const [jobCode, setJobCode] = useState('')
  const [values, setValues] = useState({})
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  })

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }
  const handleDropdownChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  return (
    <Layout>
      <Header title="Tracker Inputs" />
      <KeyboardAwareScrollView style={styles.container}>
        <FloatingInput
          placeholder="Job Code"
          value={values.job_code}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code}
          label="Job Code"
        />

        <FloatingInput
          placeholder="Customer Name"
          value={values.job_code}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code}
          label="Customer Name"
        />

        <FloatingInput
          placeholder="System Size"
          value={values.custo}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code}
          label="System Size"
        />

        <FloatingInput
          placeholder="Number of Panels"
          value={values.job_code}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code}
          label="Number of Panels"
        />

        <FloatingInput
          placeholder="Number Of Roof Workers"
          value={values.job_code}
          onChangeText={val => onChange('job_code', val)}
          error={validation?.job_code}
          label="Number Of Roof Workers"
        />

        <Select
          label="State"
          items={roofTypes}
          handleChange={val => handleDropdownChange('state', val)}
          selected={values?.state}
          showDefault={true}
          // error={validation?.state}
          labelName="name"
          valueName="id"
          placeholder="State"
          customStyleDropdown={styles.customStyleDropdown}
          showTitle={false}
        />
        {/* <Input
          error={!!errorMessage?.jobCode?.length}
          errorValue={errorMessage?.jobCode}
          onChangeText={v => onChange('jobCode', v.trim())}
          value={values.jobCode}
          placeholder="Job Code"
          placeholderTextColor={'#ffffff'}
          selectTextOnFocus
        /> */}
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default TrackerInput
