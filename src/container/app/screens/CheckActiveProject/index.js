import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Layout } from '@/layout'
import { useGetActiveProject } from '../../hooks/useTracker'
import { LoadingModal } from '@/components/LoadingModal'

const CheckActiveProject = ({ navigation }) => {
  const { activeProject, isSuccess, isLoading } = useGetActiveProject()

  useEffect(() => {
    checkActiveProject()
  }, [activeProject])

  const checkActiveProject = () => {
    if (activeProject && activeProject?.id && isSuccess) {
      navigation.navigate('Tracker', { params: activeProject })
    } else if (activeProject && !activeProject?.id && isSuccess) {
      navigation.navigate('TrackerInput')
    }
  }

  return (
    <Layout>
      <LoadingModal isLoading={isLoading} />
    </Layout>
  )
}

export default CheckActiveProject
