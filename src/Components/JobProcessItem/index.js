import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import DoneCheckIcon from '../../Assets/svg/done_check'
import DoneUnCheckIcon from '../../Assets/svg/done_unchecked'
import EditIcon from '../../Assets/svg/edit'
import PlayIcon from '../../Assets/svg/play'
import PauseIcon from '../../Assets/svg/pause'

import { styles } from './styles'

export const JobProcessItem = ({
  title = '',
  jobItem = {},
  paused = false,
  done = false,
  handleEdit = () => {},
  handlePlayPause = () => {},
  handleDone = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.doneBtn}>
          {done ? (
            <DoneCheckIcon height={24} width={24} />
          ) : (
            <DoneUnCheckIcon height={24} width={24} />
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{jobItem?.title}</Text>
          <Text style={styles.time}>00:31:29 hrs</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity>
          <EditIcon height={24} width={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playBtn}>
          {paused ? (
            <PlayIcon height={24} width={24} />
          ) : (
            <PauseIcon height={24} width={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
