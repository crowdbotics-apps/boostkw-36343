import { useMutation, useQuery } from '@tanstack/react-query'
import { trackerAPIService } from '../services/trackerAPIService'

export const useGetRoofTypes = payload => {
  const { data, isLoading, error } = useQuery(
    ['useGetRoofTypes'],
    () => trackerAPIService.getRoofTypes(payload),
    {
      staleTime: 1000,
      cacheTime: 0,
    },
    {
      onError: e => {
        console.error(e)
      },
      refetchInterval: 5000,
    },
  )

  return {
    roofTypes: data,
    isLoading,
    error,
  }
}

export const useGetCrews = payload => {
  const { data, isLoading, error } = useQuery(
    ['useGetCrews'],
    () => trackerAPIService.getCrews(payload),
    {
      staleTime: 1000,
      cacheTime: 0,
    },
    {
      onError: e => {
        console.error(e)
      },
      refetchInterval: 5000,
    },
  )

  return {
    crews: data,
    isLoading,
    error,
  }
}

export const useStartTracking = onSuccessStartTracking => {
  const { mutateAsync, isLoading, isSuccess, data, isError, error } =
    useMutation(payload => trackerAPIService.trackerInputs(payload), {
      onSuccess: data => {
        console.log('Updated in successfully')
        console.log('Success')
        onSuccessStartTracking(data)
      },
      onError: e => {
        console.error(e)
      },
    })

  return {
    startTracking: mutateAsync,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
  }
}
