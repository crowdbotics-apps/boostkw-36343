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

export const useGetCustomerTruckerInputsProcesses = (
  onSuccessFetch = () => {},
  payload,
) => {
  const { data, isLoading, error, refetch, isFetching, isFetched } = useQuery(
    ['useGetCustomerTruckerInputsProcesses'],
    () => trackerAPIService.getCustomerTruckerInputsProcesses(payload),
    {
      onSuccess: data => {
        console.log('Updated in successfully')
        console.log('Success')
        onSuccessFetch(data)
      },
    },
    {
      staleTime: 0,
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
    customerTruckerInputsProcesses: data,
    refetch,
    isFetching,
    isFetched,
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

export const useStartStopProcess = onSuccessStartStopProcess => {
  const { mutateAsync, isLoading, isSuccess, data, isError, error } =
    useMutation(payload => trackerAPIService.startStopProcess(payload), {
      onSuccess: data => {
        console.log('Updated in successfully')
        console.log('Success')
        onSuccessStartStopProcess(data)
      },
      onError: e => {
        console.error(e)
      },
    })

  return {
    startStopProcess: mutateAsync,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
  }
}

export const useCloseProject = (onSuccessCloseProject = () => {}) => {
  const { mutateAsync, isLoading, isSuccess, data, isError, error } =
    useMutation(payload => trackerAPIService.closeProject(payload), {
      onSuccess: data => {
        console.log('Updated in successfully')
        console.log('Success')
        onSuccessCloseProject(data)
      },
      onError: e => {
        console.error(e)
      },
    })

  return {
    closeProject: mutateAsync,
    isClosing: isLoading,
    isSuccess,
    data,
    isError,
    error,
  }
}
