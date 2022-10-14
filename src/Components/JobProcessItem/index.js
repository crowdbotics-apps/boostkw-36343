import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import DoneCheckIcon from '../../Assets/svg/done_check'
import DoneUnCheckIcon from '../../Assets/svg/done_unchecked'
import EditIcon from '../../Assets/svg/edit'
import PlayIcon from '../../Assets/svg/play'
import PauseIcon from '../../Assets/svg/pause'

import { styles } from './styles'

export const JobProcessItem = ({
  jobProcess = {},
  paused = false,
  done = false,
  isSelected = false,
  handleStartStop = () => {},
  handleSelect = () => {},
  handleShowEdit = () => {},
  handlePlayPause = () => {},
  handleDone = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.doneBtn}>
          {jobProcess?.status === 'completed' ? (
            <TouchableOpacity onPress={() => handleDone(jobProcess)}>
              <DoneCheckIcon height={24} width={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleDone(jobProcess)}>
              <DoneUnCheckIcon height={24} width={24} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{jobProcess?.title}</Text>
          <Text style={styles.time}>
            {jobProcess?.time ? jobProcess?.time : '-'}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={() => handleShowEdit(jobProcess)}>
          <EditIcon height={24} width={24} />
        </TouchableOpacity>

        {jobProcess?.status !== 'completed' ? (
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => handleStartStop(jobProcess)}
          >
            {jobProcess?.status === 'paused' ||
            jobProcess?.status === 'pending' ? (
              <PlayIcon height={24} width={24} />
            ) : (
              <PauseIcon height={24} width={24} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}
