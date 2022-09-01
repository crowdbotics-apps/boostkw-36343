import { api } from '@/Services/api'
import crew from './crew'

export const appApi = api.injectEndpoints({
  endpoints: build => ({
    fetchCrew: crew(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchAppQuery } = appApi
