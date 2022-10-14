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

function getActiveProject() {
  return request
    .get('/trackers/customer-tracker-active/')
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function closeProject(payload) {
  return request
    .patch(`trackers/customer-tracker-inputs/${payload.id}/`, payload)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function getCustomerTruckerInputsProcesses(payload) {
  console.log('payload tracker_id', payload)
  return request
    .get(`trackers/customer-tracker-inputs/${payload.tracker_id}/`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

function startStopProcess(payload) {
  return request
    .patch(
      `trackers/customer-tracker-inputs/${payload.tracker_id}/job-processes/${payload.job_process_id}/`,
      payload.jobProcessItem,
    )
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
  getCustomerTruckerInputsProcesses,
  trackerInputs,
  closeProject,
  getActiveProject,
  startStopProcess,
}
