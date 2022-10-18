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
  handleShowDone = () => {},
}) => {
  return (
    <View style={[styles.container, isSelected && styles.containerSelected]}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.doneBtn}>
          {jobProcess?.status === 'completed' ? (
            <TouchableOpacity onPress={() => handleShowDone(jobProcess)}>
              <DoneCheckIcon height={28} width={28} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleShowDone(jobProcess)}>
              <DoneUnCheckIcon height={28} width={28} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect(jobProcess)}>
          <Text style={styles.title}>{jobProcess?.title}</Text>
          <Text style={styles.time}>
            {jobProcess?.time ? jobProcess?.time : '-'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={() => handleShowEdit(jobProcess)}>
          <EditIcon height={28} width={28} />
        </TouchableOpacity>

        {jobProcess?.status !== 'completed' ? (
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => handleStartStop(jobProcess)}
          >
            {jobProcess?.status === 'paused' ||
            jobProcess?.status === 'pending' ? (
              <PlayIcon height={28} width={28} />
            ) : (
              <PauseIcon height={28} width={28} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}
