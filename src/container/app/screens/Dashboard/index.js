import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@/components'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'

const Dashboard = () => {
  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  })

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  return (
    <Layout>
      <Header title="Dashboard" />
    </Layout>
  )
}

export default Dashboard
