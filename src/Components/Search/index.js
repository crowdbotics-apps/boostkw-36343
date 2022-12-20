import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { ClosedJobDetails } from '../ClosedJobDetails'
import { Header } from '../Header'
import { ListEmptyComponent } from '../ListEmptyComponent'
import { useGetCustomerTrackerInput } from '@/container/app/hooks/useTracker'

import { styles } from './styles'

const RenderJobItem = ({ item, onPress = () => {} }) => {
  console.log('item', item)
  return (
    <TouchableOpacity style={styles.jobItem} onPress={() => onPress(item)}>
      <Text style={styles.code}>Code: {item?.job_code} </Text>
      <Text style={styles.name}>Customer: {item?.customer_name}</Text>
      <View style={styles.status}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.statusValue,
            item?.status === 'active' && styles.statusActive,
          ]}
        >
          {item?.status}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export const Search = ({ setVisible = () => {} }) => {
  const navigation = useNavigation()

  const [query, setQuery] = useState('')
  const [header, setHeader] = useState('Search')
  const [jobDetails, setJobDetails] = useState({})

  const { projects, isLoading } = useGetCustomerTrackerInput({ query: query })
  console.log('projects', isLoading)

  console.log('jobDetails', jobDetails)

  const handleDetail = jobItem => {
    console.log('jobItem', jobItem)
    // if (jobItem?.status === 'closed') {
    setJobDetails(jobItem)
    // }
  }
  const handleContinueTracking = () => {
    setJobDetails({})
    setVisible(false)
    navigation.navigate('TrackerStack')
  }
  return (
    <View style={{ flex: 1 }}>
      {jobDetails?.status ? (
        <>
          <Header
            title={
              jobDetails?.location === 'roof'
                ? 'Roof tracker'
                : 'Ground tracker'
            }
            showBack
            onPress={() => setJobDetails({})}
          />
          <View style={styles.container}>
            <ClosedJobDetails
              jobItem={jobDetails}
              handleContinueTracking={handleContinueTracking}
            />
          </View>
        </>
      ) : (
        <>
          <Header title="Search" onPress={() => setVisible(false)} showBack />
          <View style={styles.container}>
            <TextInput
              onChangeText={setQuery}
              placeholder="Search"
              style={styles.input}
              placeholderTextColor="#fff"
            />

            <View style={{ flex: 1 }}>
              <FlatList
                data={query ? projects || [] : []}
                renderItem={item => (
                  <RenderJobItem item={item.item} onPress={handleDetail} />
                )}
                keyExtractor={item => item.title}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: 100 }}
                ListEmptyComponent={
                  <ListEmptyComponent
                    listEmptyComponent="Please enter the job title"
                    isLoading={isLoading}
                  />
                }
              />
            </View>
          </View>
        </>
      )}
    </View>
  )
}
