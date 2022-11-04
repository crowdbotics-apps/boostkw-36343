import axios from 'axios'
import { store } from '../Store'

const cbUrl = 'https://boostkw-36343.botics.co/api/v1/'

export const request = axios.create({
  baseURL: cbUrl,
})

request.interceptors.request.use(function (config) {
  const token = store.getState().auth?.user?.token

  if (token) {
    config.headers.Authorization = 'Token ' + token
  }

  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    return Promise.reject(error)
  },
)
