import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import ArraysIcon from '../../../../Assets/svg/arrays'
import PanelsIcon from '../../../../Assets/svg/panels'
import RoofTypeIcon from '../../../../Assets/svg/roof_type'
import BatteryIcon from '../../../../Assets/svg/battery'
import SwipeableModal from '@/components/SwipeableModal'
import FloatingInput from '@/components/FloatingInput'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import TimePicker from '@/components/TimePicker'
import { JobProcessItem } from '@/components/JobProcessItem'
import { LoadingModal } from '@/components/LoadingModal'
import { Modal } from '@/components/Modal'
import {
  useCloseProject,
  useGetCustomerTruckerInputsProcesses,
  useStartStopProcess,
} from '../../hooks/useTracker'

import { processesTime } from '@/util/helpers'
import * as appStyles from '../../../../util/appStyles'
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
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedProcess, setSelectedProcess] = useState({})
  const [saveTimeError, setSaveTimeError] = useState('')
  const [showDone, setShowDone] = useState(false)
  const [selectedProcessToDone, setSelectedProcessToDone] = useState({})

  const [dateStart, setDateStart] = useState(new Date())
  const [date, setDate] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())
  const [totalTime, setTotalTime] = useState('')
  const [runningProcesses, setRunningProcesses] = useState(0)

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
      let totalTime = 0
      let runningProcessesCount = 0

      const newProcess = trackingInfo?.job_processes?.map(job_process => {
        let item = {}

        const totalPausedTimeSeconds =
          job_process?.total_paused_time_seconds * 1000
        const startTime = new Date(job_process?.start_datetime)?.getTime()

        if (job_process.status === 'active') {
          const now = new Date().getTime()

          const timeDifference = now - startTime - totalPausedTimeSeconds

          totalTime = totalTime + timeDifference
          const time = processesTime(timeDifference)

          item = { ...job_process, ...{ time: time } }
          runningProcessesCount = runningProcessesCount + 1
        } else if (job_process.status === 'paused') {
          const lastPausedDatetime = new Date(
            job_process?.last_paused_datetime,
          ).getTime()

          const timeDifference =
            lastPausedDatetime - startTime - totalPausedTimeSeconds

          totalTime = totalTime + timeDifference
          const time = processesTime(timeDifference)

          item = { ...job_process, ...{ time: time } }
        } else if (job_process.status === 'completed') {
          const endDatetime = new Date(job_process?.end_datetime).getTime()

          const timeDifference =
            endDatetime - startTime - totalPausedTimeSeconds

          totalTime = totalTime + timeDifference
          const time = processesTime(timeDifference)

          item = { ...job_process, ...{ time: time } }
        }
        item = { ...job_process, ...item }

        return item
      })

      const time = processesTime(totalTime)

      setRunningProcesses(runningProcessesCount)
      setTotalTime(time)

      setProcesses(newProcess)
    }
  }

  function onSuccessStartStopProcess(data) {
    setEditDetails({})
    setShowEdit(false)
    setSelectedProcessToDone({})
    setSelectedProcess({})
    setShowDone(false)
    refetch()
  }

  const handleSelect = jobProcess => {
    console.log('handleSelect jobProcess', jobProcess)
    if (jobProcess?.id === selectedProcess?.id) {
      setSelectedProcess({})
    } else if (jobProcess?.status !== 'completed') {
      setSelectedProcess(jobProcess)
    }
  }

  const handleStartSelectedProcess = async () => {
    if (
      selectedProcess?.status === 'pending' ||
      selectedProcess?.status === 'paused' ||
      selectedProcess?.status === 'active'
    ) {
      handleStartStop(selectedProcess)
      setSelectedProcess({})
    }
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

  const handleDone = () => {
    const nowDateTime = dayjs().format()

    let payload = {
      tracker_id: params?.id,
      job_process_id: selectedProcessToDone?.id,
    }

    let jobProcessItem = {
      status: 'completed',
    }

    let pending = {
      start_datetime: nowDateTime,
      end_datetime: nowDateTime,
    }

    let activeOrPaused = {
      start_datetime: selectedProcessToDone?.start_datetime,
      end_datetime: nowDateTime,
    }

    if (selectedProcessToDone?.status === 'pending') {
      jobProcessItem = { ...jobProcessItem, ...pending }
    } else {
      jobProcessItem = { ...jobProcessItem, ...activeOrPaused }
    }

    payload = { ...payload, jobProcessItem: jobProcessItem }

    if (selectedProcessToDone?.id) {
      startStopProcess({ ...payload, jobProcessItem: jobProcessItem })
    }
  }

  const handleShowDone = jobProcess => {
    setShowDone(true)
    setSelectedProcessToDone(jobProcess)
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
    const nowDateTime = dayjs().format()

    const jobProcessItem = {
      start_datetime: editDetails.start_datetime || nowDateTime,
      end_datetime: editDetails.end_datetime,
      status: 'completed',
    }
    console.log('editDetails', editDetails)
    console.log('jobProcessItem', jobProcessItem)

    if (editDetails.end_datetime == null) {
      setSaveTimeError('Please select End Datetime')
      return
    }

    setSaveTimeError('')

    if (
      new Date(jobProcessItem.end_datetime) <
      new Date(jobProcessItem.start_datetime)
    ) {
      setSaveTimeError('End time must be greater than or equal to start time.')
      return
    }
    setSaveTimeError('')
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
            <Text style={styles.value}>{trackingInfo?.system_size} kW</Text>
          </View>
        </View>

        <Text style={styles.timeSpent}>Time Spent: {totalTime} hrs</Text>
        <Button
          buttonText={
            selectedProcess?.id
              ? selectedProcess?.status === 'active'
                ? 'Stop'
                : 'Start'
              : runningProcesses > 0
              ? 'Stop'
              : 'Start'
          }
          isDisabled={!selectedProcess?.id}
          onPress={handleStartSelectedProcess}
        />

        <View style={styles.infoPlatform}>
          <View style={styles.itemLabelValue}>
            <PanelsIcon height={30} width={30} />
            <Text style={styles.label}>Panels</Text>
            <Text style={styles.value}>{trackingInfo?.number_of_panels}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <RoofTypeIcon height={30} width={30} />
            <Text style={styles.label}>Roof Type</Text>
            <Text style={styles.value}>{trackingInfo?.roof_type?.name}</Text>
          </View>

          <View style={styles.itemLabelValue}>
            <ArraysIcon height={30} width={30} />
            <Text style={styles.label}>Arrays</Text>
            <Text style={styles.value}>{trackingInfo?.number_of_arrays}</Text>
          </View>

          {params?.is_battery ? (
            <View style={styles.itemLabelValue}>
              <View style={{ marginLeft: 9 }}>
                <BatteryIcon height={30} width={30} />
              </View>
              <Text style={styles.label}>Battery</Text>
              <Text style={styles.value}>
                {trackingInfo?.number_of_batteries}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.jobProcess}>Job Process</Text>

        <View style={styles.processes}>
          {processes?.map((jobProcess, idx) => {
            return (
              <JobProcessItem
                jobProcess={jobProcess}
                handleSelect={handleSelect}
                handleShowEdit={handleShowEdit}
                isSelected={selectedProcess?.id === jobProcess.id}
                key={idx}
                handleStartStop={handleStartStop}
                handleShowDone={handleShowDone}
              />
            )
          })}
        </View>

        <Button buttonText="Close Project" onPress={handleClose} />

        <SwipeableModal
          visible={showEdit}
          buttonText={
            showStartTimePicker || showEndTimePicker ? 'Done' : 'Save'
          }
          showCancel={showStartTimePicker || showEndTimePicker ? false : true}
          handleCancel={() => {
            setSaveTimeError('')
            setShowEdit(false)
          }}
          onPressBtn={
            showStartTimePicker || showEndTimePicker
              ? handleCloseTime
              : handleSaveTime
          }
          title={editDetails?.title ? editDetails?.title : ''}
          onClose={() => {
            setSaveTimeError('')
            setShowEdit(false)
          }}
          isLoading={isLoading}
        >
          <View
            style={{
              minHeight: 20,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {saveTimeError?.length > 0 ? (
              <View>
                <Text style={appStyles.styles.inputError}>{saveTimeError}</Text>
              </View>
            ) : null}
          </View>

          <FloatingInput
            placeholder="Start Time"
            value={dayjs(editDetails?.start_datetime || new Date()).format(
              'h:mm:ss A',
            )}
            onChangeText={val => {
              setShowStartTimePicker(false)
              onChange('start_datetime', val)
            }}
            label="Start Time"
            time={true}
            onPressTime={handleShowStartTimePicker}
          />

          <FloatingInput
            placeholder="End Time"
            value={
              editDetails?.end_datetime
                ? dayjs(editDetails?.end_datetime || new Date()).format(
                    'h:mm:ss A',
                  )
                : ''
            }
            label="End Time"
            time={true}
            onPressTime={handleShowEndTimePicker}
          />

          {useMemo(() => {
            return (
              <TimePicker
                value={dateStart || new Date()}
                onChange={val => {
                  const date = dayjs(val).format()
                  setDateStart(val)
                  handleTimeChange('start_datetime', date)
                  console.log('val', date)

                  console.log('val', typeof dayjs(val).format('h:mm:ss A'))
                }}
                visible={showStartTimePicker}
                onClose={() => setShowStartTimePicker(false)}
              />
            )
          }, [showStartTimePicker])}

          {useMemo(() => {
            return (
              <TimePicker
                value={new Date()}
                onChange={val => {
                  const date = dayjs(val).format()
                  const time = dayjs(val).format('h:mm:ss A')
                  setDateEnd(val)
                  handleTimeChange('end_datetime', date)
                  console.log('val', typeof dayjs(val).format('h:mm:ss A'))
                }}
                visible={showEndTimePicker}
                onClose={() => setShowEndTimePicker(false)}
              />
            )
          }, [showEndTimePicker])}
        </SwipeableModal>

        <LoadingModal isLoading={isLoading || isClosing} />
        <Modal visible={showDone}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedProcessToDone?.title}</Text>
          </View>
          <Text style={styles.hours}>
            Total Spent: {selectedProcessToDone?.time || '00:00:00'} hrs
          </Text>

          {selectedProcessToDone?.status === 'completed' ? (
            <>
              <Text style={styles.message}>Job completed</Text>

              <Button buttonText="Close" onPress={() => setShowDone(false)} />
            </>
          ) : (
            <>
              <Text style={styles.message}>Mark job process as Done?</Text>

              <Button buttonText="Done" onPress={() => handleDone()} />

              <TouchableOpacity
                onPress={() => {
                  setShowDone(false)
                }}
              >
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Modal>
        <View style={{ height: 100 }} />
      </ScrollView>
    </Layout>
  )
}

export default Tracker
