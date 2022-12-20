import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import ArraysIcon from '../../Assets/svg/arrays'
import PanelsIcon from '../../Assets/svg/panels'
import RoofTypeIcon from '../../Assets/svg/roof_type'
import BatteryIcon from '../../Assets/svg/battery'

import { Button } from '../Button'

import { styles } from './styles'

const JobProcessItem = ({ jobProcess }) => {
  return (
    <View style={styles.jobProcessItem}>
      <Text style={styles.processTitle}>{jobProcess?.title}</Text>
      <Text style={styles.processTime}>
        {jobProcess?.time_spent?.hours} hrs, {jobProcess?.time_spent?.minutes}{' '}
        mins, {jobProcess?.time_spent?.hours} secs
      </Text>
    </View>
  )
}

export const ClosedJobDetails = ({
  jobItem = {},
  handleContinueTracking = () => {},
}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.infoPlatform}>
          <View>
            <Text style={styles.label}>Customer Name</Text>
            <Text style={styles.value}>{jobItem?.customer_name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Job Code</Text>
            <Text style={styles.value}>{jobItem?.job_code}</Text>
          </View>

          <View>
            <Text style={styles.label}>System Size</Text>
            <Text style={styles.value}>{jobItem?.system_size} kW</Text>
          </View>
        </View>

        <Text style={styles.timeSpent}>
          Time Spent: {Math.floor(jobItem?.total_time_spent_seconds / 3600)} hrs
        </Text>

        {jobItem?.status === 'active' && (
          <Button buttonText="Go To Tracker" onPress={handleContinueTracking} />
        )}

        <View style={styles.infoPlatform}>
          <View style={styles.itemLabelValue}>
            <PanelsIcon height={30} width={30} />
            <Text style={styles.label}>Panels</Text>
            <Text style={styles.value}>{jobItem?.number_of_panels}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <RoofTypeIcon height={30} width={30} />
            <Text style={styles.label}>Roof Type</Text>
            <Text style={styles.value}>{jobItem?.roof_type?.name}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <ArraysIcon height={30} width={30} />
            <Text style={styles.label}>Arrays</Text>
            <Text style={styles.value}>{jobItem?.number_of_arrays}</Text>
          </View>

          {jobItem?.is_battery ? (
            <View style={styles.itemLabelValue}>
              <View style={{ marginLeft: 9 }}>
                <BatteryIcon height={30} width={30} />
              </View>
              <Text style={styles.label}>Battery</Text>
              <Text style={styles.value}>{jobItem?.number_of_batteries}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.jobProcess}>Job Process</Text>

        <View style={styles.processes}>
          {jobItem?.job_processes?.map((jobProcess, idx) => {
            return <JobProcessItem jobProcess={jobProcess} />
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </>
  )
}
