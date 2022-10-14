import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import ArraysIcon from '../../../../Assets/svg/arrays'
import PanelsIcon from '../../../../Assets/svg/panels'
import RoofTypeIcon from '../../../../Assets/svg/roof_type'
import SwipeableModal from '@/components/SwipeableModal'
import FloatingInput from '@/components/FloatingInput'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import TimePicker, { getDateTimePicker } from '@/components/TimePicker'
import { JobProcessItem } from '@/components/JobProcessItem'
import { LoadingModal } from '@/components/LoadingModal'
import { Modal } from '@/components/Modal'
import {
  useCloseProject,
  useGetCustomerTruckerInputsProcesses,
  useStartStopProcess,
} from '../../hooks/useTracker'

import { styles } from './styles'

dayjs.extend(utc)

const Tracker = ({ route, navigation }) => {
  const params = route.params?.params

  const { customerTruckerInputsProcesses, refetch, isFetching } =
    useGetCustomerTruckerInputsProcesses(onSuccessFetch, {
      tracker_id: params.id,
    })
  const { startStopProcess, isLoading } = useStartStopProcess(
    onSuccessStartStopProcess,
  )

  const { closeProject, isClosing } = useCloseProject(onSuccessCloseProject)

  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState({})
  const [processes, setProcesses] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [editDetails, setEditDetails] = useState({})
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  const [selectedProcesses, setSelectedProcesses] = useState([])

  const [showDone, setShowDone] = useState(false)
  const [selectedProcessToDone, setSelectedProcessToDone] = useState([])

  const [dateStart, setDateStart] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())
  const [totalTime, setTotalTime] = useState('')

  const handleTimeChange = (key, value) => {
    setEditDetails({
      ...editDetails,
      [key]: value,
    })
  }

  useEffect(() => {
    getValues()
  }, [customerTruckerInputsProcesses])

  const getValues = () => {
    if (customerTruckerInputsProcesses?.id) {
      setTrackingInfo(customerTruckerInputsProcesses)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('This will run every second!')
      calculateTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [trackingInfo])

  const calculateTime = () => {
    if (trackingInfo?.id) {
      let totalTotal = 0

      const newProcess = trackingInfo?.job_processes?.map(job_process => {
        let item = {}

        if (job_process.status === 'active') {
          const startTime = new Date(job_process?.start_datetime).getTime()
          const now = new Date().getTime()

          const totalPausedTimeSeconds =
            job_process?.total_paused_time_seconds * 1000

          const timeDifference = now - startTime - totalPausedTimeSeconds

          console.log('totalPausedTimeSeconds', totalPausedTimeSeconds)

          const date1 = dayjs(job_process?.start_datetime)
          const date2 = dayjs()

          let hoursss = date2.diff(date1, 'hours')
          let min = date2.diff(date1, 'hours')

          totalTotal = totalTotal + timeDifference

          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          )
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
          )
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
          // console.log(startTime)
          // console.log('days', days)
          // console.log('minutes', minutes)
          // console.log('seconds', seconds)
          // console.log('hours', hours)
          let processTime = days + ':' + hours + ':' + minutes + ':' + seconds
          // console.log('time', time)
          item = { ...job_process, ...{ time: processTime } }
        } else if (job_process.status === 'paused') {
          const startTime = new Date(job_process?.start_datetime).getTime()

          const lastPausedDatetime = new Date(
            job_process?.last_paused_datetime,
          ).getTime()

          const totalPausedTimeSeconds =
            job_process?.total_paused_time_seconds * 1000
          // const totalPausedTimeSeconds = 2 * 1000

          const timeDifference =
            lastPausedDatetime - startTime - totalPausedTimeSeconds

          if (job_process?.id == 210) {
            console.log('totalPausedTimeSeconds', totalPausedTimeSeconds)
            console.log('timeDifference paused', timeDifference)
            console.log(
              'job_process?.last_paused_datetime',
              job_process?.last_paused_datetime,
            )
          }
          // console.log('timeDifference', timeDifference)

          totalTotal = totalTotal + timeDifference

          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          )
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
          )
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

          let processTime = days + ':' + hours + ':' + minutes + ':' + seconds

          item = { ...job_process, ...{ time: processTime } }
        } else if (job_process.status === 'completed') {
          const startTime = new Date(job_process?.start_datetime).getTime()

          const endDatetime = new Date(job_process?.end_datetime).getTime()

          const totalPausedTimeSeconds =
            job_process?.total_paused_time_seconds * 1000

          const timeDifference =
            endDatetime - startTime - totalPausedTimeSeconds

          totalTotal = totalTotal + timeDifference

          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          )
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
          )
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

          let processTime = days + ':' + hours + ':' + minutes + ':' + seconds

          item = { ...job_process, ...{ time: processTime } }
        }
        item = { ...job_process, ...item }

        return item
      })

      const days = Math.floor(totalTotal / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (totalTotal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((totalTotal % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((totalTotal % (1000 * 60)) / 1000)

      let processesTime = days + ':' + hours + ':' + minutes + ':' + seconds

      // console.log('processesTime', processesTime)
      // console.log('processesTime', processesTime)
      setTotalTime(processesTime)

      setProcesses(newProcess)
    }
  }

  function onSuccessStartStopProcess(data) {
    setEditDetails({})
    setShowEdit(false)
    refetch()
  }

  const handleSelect = jobProcess => {
    console.log('handleSelect jobProcess', jobProcess)

    const isSelected = selectedProcesses.some(item => item.id === jobProcess.id)

    if (isSelected) {
      const sel = selectedProcesses.filter(item => item.id !== jobProcess.id)
      console.log('sel', sel)
      setSelectedProcesses(
        selectedProcesses.filter(item => item.id !== jobProcess.id),
      )
    } else if (jobProcess?.is_paused) {
      setSelectedProcesses([...selectedProcesses, jobProcess])
    }
  }

  const handleStartSelectedProcess = async () => {
    for (const jobProcess of selectedProcesses) {
      await handleStartStop(jobProcess)
    }
    setSelectedProcesses([])
  }

  const handleShowEdit = jobProcess => {
    let details = { ...jobProcess }

    console.log('setEditDetails', details)
    setEditDetails(details)
    setShowEdit(true)
  }

  const handleStartStop = jobProcess => {
    const nowDateTime = dayjs().format()

    let payload = {}

    if (jobProcess.status === 'pending') {
      //Start the project
      payload['start_datetime'] = nowDateTime
      payload['status'] = 'active'
    } else if (jobProcess.status === 'active') {
      //Pause the project
      payload['last_paused_datetime'] = nowDateTime
      payload['status'] = 'paused'
    } else if (jobProcess.status === 'paused') {
      //continue tracking
      payload['status'] = 'active'
      payload['resuming_datetime'] = nowDateTime
    }

    startStopProcess({
      tracker_id: jobProcess?.customer_tracker,
      job_process_id: jobProcess?.id,
      jobProcessItem: payload,
    })
  }

  const handleDone = jobProcess => {
    console.log('jobProcess', jobProcess)
    if (
      jobProcess?.time &&
      jobProcess?.status !== 'pending' &&
      jobProcess?.status !== 'completed'
    ) {
      setShowDone(true)
      setSelectedProcessToDone(jobProcess)
    }
  }

  function onSuccessFetch(data) {
    console.log('onSuccessFetch', data)
  }

  const handleClose = async () => {
    closeProject({ id: params?.id, status: 'closed' })
  }

  function onSuccessCloseProject(data) {
    setTrackingInfo({})
    setProcesses([])
    navigation.navigate('TrackerInput', { reset: true })
  }

  const handleCloseTime = () => {
    setShowStartTimePicker(false)
    setShowEndTimePicker(false)
  }

  const handleShowStartTimePicker = () => {
    setShowEndTimePicker(false)
    setShowStartTimePicker(true)
  }
  const handleShowEndTimePicker = () => {
    setShowEndTimePicker(true)
    setShowStartTimePicker(false)
  }

  const handleSaveTime = () => {
    const jobProcessItem = {
      start_datetime: editDetails.start_datetime,
      end_datetime: editDetails.end_datetime,
      status: 'completed',
    }
    console.log('editDetails', editDetails)
    console.log('jobProcessItem', jobProcessItem)

    if (params?.id && editDetails?.id) {
      startStopProcess({
        jobProcessItem: jobProcessItem,
        tracker_id: params?.id,
        job_process_id: editDetails?.id,
      })
    } else {
      console.log('Not saved')
    }
  }

  return (
    <Layout>
      <Header
        title={
          trackingInfo?.location === 'roof' ? 'Roof tracker' : 'Ground tracker'
        }
      />
      <ScrollView style={styles.container}>
        <View style={styles.infoPlatform}>
          <View>
            <Text style={styles.label}>Customer Name</Text>
            <Text style={styles.value}>{trackingInfo?.customer_name}</Text>
          </View>

          <View>
            <Text style={styles.label}>Job Code</Text>
            <Text style={styles.value}>{trackingInfo?.job_code}</Text>
          </View>

          <View>
            <Text style={styles.label}>System Size</Text>
            <Text style={styles.value}>{trackingInfo?.system_size}</Text>
          </View>
        </View>

        <Text style={styles.timeSpent}>Time Spent: {totalTime} hrs</Text>

        <Button
          buttonText="Start"
          isDisabled={selectedProcesses.length < 1}
          onPress={handleStartSelectedProcess}
        />

        <View style={styles.infoPlatform}>
          <View style={styles.itemLabelValue}>
            <PanelsIcon height={24} width={24} />
            <Text style={styles.label}>Panels</Text>
            <Text style={styles.value}>{trackingInfo?.number_of_panels}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <RoofTypeIcon height={24} width={24} />
            <Text style={styles.label}>Roof Type</Text>
            <Text style={styles.value}>{trackingInfo?.roof_type?.name}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <ArraysIcon height={24} width={24} />
            <Text style={styles.label}>Arrays</Text>
            <Text style={styles.value}>{trackingInfo?.number_of_arrays}</Text>
          </View>
        </View>

        <Text style={styles.jobProcess}>{processes?.length} Job Process</Text>

        {processes?.map((jobProcess, idx) => {
          let isSelected = selectedProcesses.some(
            item => item.id === jobProcess.id,
          )
          return (
            <JobProcessItem
              jobProcess={jobProcess}
              handleSelect={handleSelect}
              handleShowEdit={handleShowEdit}
              isSelected={isSelected}
              key={idx}
              handleStartStop={handleStartStop}
              handleDone={handleDone}
            />
          )
        })}

        <Button buttonText="Close Project" onPress={handleClose} />

        <SwipeableModal
          visible={showEdit}
          buttonText={
            showStartTimePicker || showEndTimePicker ? 'Done' : 'Save'
          }
          showCancel={showStartTimePicker || showEndTimePicker ? false : true}
          handleCancel={() => setShowEdit(false)}
          onPressBtn={
            showStartTimePicker || showEndTimePicker
              ? handleCloseTime
              : handleSaveTime
          }
          title={editDetails?.title ? editDetails?.title : ''}
          onClose={() => setShowEdit(false)}
          isLoading={isLoading}
        >
          <FloatingInput
            placeholder="Start Time"
            value={dayjs(editDetails?.start_datetime).format('h:mm:ss A')}
            onChangeText={val => onChange('start_datetime', val)}
            label="Start Time"
            time={true}
            onPressTime={handleShowStartTimePicker}
          />

          <View>
            <TimePicker
              value={dateStart}
              onChange={val => {
                const date = dayjs(val).format()
                setDateStart(val)
                handleTimeChange('start_datetime', date)
                console.log('val', date)

                console.log('val', typeof dayjs(val).format('h:mm:ss A'))
              }}
              visible={showStartTimePicker}
            />
          </View>

          <FloatingInput
            placeholder="End Time"
            value={
              editDetails?.end_datetime
                ? dayjs(editDetails?.end_datetime).format('h:mm:ss A')
                : ''
            }
            label="End Time"
            time={true}
            onPressTime={handleShowEndTimePicker}
          />

          <View>
            <TimePicker
              value={dateEnd}
              onChange={val => {
                const date = dayjs(val).format()
                const time = dayjs(val).format('h:mm:ss A')
                setDateEnd(val)
                handleTimeChange('end_datetime', date)
                console.log('val', typeof dayjs(val).format('h:mm:ss A'))
              }}
              visible={showEndTimePicker}
            />
          </View>
        </SwipeableModal>

        <LoadingModal isLoading={isLoading || isClosing} />
        <Modal visible={showDone}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedProcessToDone?.title}</Text>
          </View>
          <Text style={styles.hours}>
            Total Spent: {selectedProcessToDone?.time} hrs
          </Text>

          <Text style={styles.message}>Mark job process as Done?</Text>

          <Button buttonText="Done" />

          <TouchableOpacity onPress={() => setShowDone(false)}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </Modal>
        <View style={{ height: 100 }} />
      </ScrollView>
    </Layout>
  )
}

export default Tracker
