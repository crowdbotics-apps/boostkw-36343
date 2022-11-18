import { request } from '../../../util/http'

function getStatistics() {
  return request
    .get('trackers/stats/')
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function getStatisticsDaily(payload) {
  return request
    .get(`trackers/stats/chart/daily/?month=${payload.month}`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

export const statisticsAPIService = {
  getStatistics,
  getStatisticsDaily,
}
