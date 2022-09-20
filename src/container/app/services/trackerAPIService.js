import { request } from '../../../util/http'

function getRoofTypes() {
  return request
    .get('roofs/types/')
    .then(res => {
      return res.data.results
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function getCrews() {
  return request
    .get('crews/')
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function trackerInputs(payload) {
  return request
    .post('trackers/customer-tracker-inputs/', payload)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

export const trackerAPIService = {
  getRoofTypes,
  getCrews,
  trackerInputs,
}
