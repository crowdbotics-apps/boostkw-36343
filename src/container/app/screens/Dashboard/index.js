import { View, Text, Image, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import React, { useCallback, useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'

import { FullModal } from '@/components/FullModal'
import { Search } from '@/components/Search'
import { Layout } from '@/layout'
import { Header } from '@/components/Header'
import { useGetProfile } from '../../hooks/useProfile'
import {
  useGetStatistics,
  useGetStatisticsDaily,
} from '../../hooks/useStatistics'
import { MonthPicker } from '@/components/MonthPicker'
import * as appStyles from '../../../../util/appStyles'

import { styles } from './styles'

const MONTHS = [
  { name: 'January', number: 1, short: 'Jan' },
  { name: 'February', number: 2, short: 'Feb' },
  { name: 'March', number: 3, short: 'Mar' },
  { name: 'April', number: 4, short: 'Apr' },
  { name: 'May', number: 5, short: 'May' },
  { name: 'June', number: 6, short: 'Jun' },
  { name: 'July', number: 7, short: 'July' },
  { name: 'August', number: 8, short: 'Aug' },
  { name: 'September', number: 9, short: 'Sept' },
  { name: 'October', number: 10, short: 'Oct' },
  { name: 'November', number: 11, short: 'Nov' },
  { name: 'December', number: 12, short: 'Dec' },
]

const Dashboard = () => {
  const { profile, refetchProfile } = useGetProfile()
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState({
    name: 'November',
    number: new Date().getMonth() + 1,
  })
  const [averageKW, setAverageKW] = useState()

  const [graphValues, setGraphValues] = useState({ yValues: [], xValues: [] })

  const { statistics, refetchGetStatistics } = useGetStatistics()
  const { dailyStatistics, refectGetStatisticsDaily, isLoading } =
    useGetStatisticsDaily({
      month: selected.number,
    })

  useFocusEffect(
    useCallback(() => {
      refectGetStatisticsDaily()
      refetchGetStatistics()
      refetchProfile()
    }, [selected]),
  )

  useEffect(() => {
    getDailyStatistics()
  }, [dailyStatistics])

  const getDailyStatistics = () => {
    // console.log('dailyStatistics', dailyStatistics)

    if (dailyStatistics?.length > 0) {
      const yValues = dailyStatistics
        ?.sort(function (a, b) {
          return a.day - b.day
        })
        .map(value => {
          const monthShort = MONTHS.find(obj => {
            return obj.number === value?.month
          })

          return `${value?.day} ${monthShort?.short}`
        })

      const xValues = dailyStatistics
        ?.sort(function (a, b) {
          return a.day - b.day
        })
        .map(value => Math.floor(value.avg_seconds_per_kw / 3600))

      const avg_seconds_per_kw = statistics?.monthly_list_avg?.find(obj => {
        return obj.month === selected?.number
      })

      setGraphValues({ yValues, xValues })

      if (avg_seconds_per_kw?.avg_seconds_per_kw) {
        setAverageKW((avg_seconds_per_kw.avg_seconds_per_kw / 3600).toFixed(2))
      }
    } else if (dailyStatistics?.length === 0) {
      setGraphValues({ yValues: [], xValues: [] })
      setAverageKW()
    }
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Header
          title="Dashboard"
          showSearch={true}
          onPress={() => setVisible(true)}
        />
        <Image
          source={{ uri: profile?.profile_picture }}
          style={styles.avatar}
        />
        <View style={styles.intro}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.jobTitle}> {profile?.profile?.job_title}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.branch}>
            <Text style={styles.label}>Branch</Text>
            <Text style={styles.value}>{profile?.profile?.branch || ''}</Text>
          </View>
          <View style={styles.crew}>
            <Text style={styles.label}>Crew Name</Text>
            <Text style={styles.value}>{profile?.crew?.name}</Text>
          </View>
        </View>

        <View style={styles.workStat}>
          <View style={styles.workStatItem}>
            <Text style={styles.label}>kW Installed</Text>
            <Text style={styles.value}>
              {Math.floor(statistics?.avg_seconds_per_kw / 3600) || '0'}
            </Text>
          </View>

          <View style={styles.workStatItem}>
            <Text style={styles.label}>Hour Worked</Text>
            <Text style={styles.value}>
              {Math.floor(statistics?.total_time_spent_seconds / 3600) || '0'}
            </Text>
          </View>

          <View style={styles.workStatItem}>
            <Text style={styles.label}>Installations</Text>
            <Text style={styles.value}>
              {statistics?.total_installations || '0'}
            </Text>
          </View>
        </View>

        <MonthPicker
          months={MONTHS}
          selected={selected}
          setSelected={setSelected}
        />

        {graphValues?.xValues?.length > 0 && (
          <>
            <View style={styles.averageKW}>
              <Text style={styles.averageKWValue}>{averageKW || '0'}</Text>
              <Text style={styles.averageKWLabel}>Avg hr/kW</Text>
            </View>
            <LineChart
              data={{
                labels: graphValues?.yValues,
                datasets: [
                  {
                    data: graphValues?.xValues,
                  },
                ],
              }}
              withOuterLines={true}
              withVerticalLines={false}
              width={appStyles.wp(90)} // from react-native
              height={appStyles.hp(25)}
              yAxisLabel=""
              yAxisSuffix=""
              // renderDotContent={({x, y, index, indexData})=><View />}
              yAxisInterval={5} // optional, defaults to 1
              yLabelsOffset={5}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 12,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '5',
                  stroke: '#10C3EB',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 12,
              }}
            />
          </>
        )}
        {isLoading && graphValues?.xValues?.length === 0 && (
          <View style={styles.empty}>
            <Progress.Circle size={20} indeterminate={true} color="#fff" />
          </View>
        )}

        {!isLoading && graphValues?.xValues?.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No statistics to display in {selected.name}
            </Text>
          </View>
        )}

        <FullModal visible={visible}>
          <Search setVisible={setVisible} />
        </FullModal>

        <View style={{ height: 100 }} />
      </ScrollView>
    </Layout>
  )
}

export default Dashboard
