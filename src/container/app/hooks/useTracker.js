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
