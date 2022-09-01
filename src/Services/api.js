import { Config } from '@/Config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ 
  baseUrl: Config.API_DEV_URL, 
  // headers: { 'content-type': 'application/json' },
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token
  // headers.set("Content-Type", "application/json");
  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }

  //   return headers
  // },
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
