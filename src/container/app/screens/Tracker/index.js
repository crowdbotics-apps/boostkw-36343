import React from 'react'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'

const Tracker = ({ route, navigation }) => {
  const { location } = route.params
  return (
    <Layout>
      <Header title={location === 'roof' ? 'Roof tracker' : 'Ground tracker'} />
    </Layout>
  )
}

export default Tracker
