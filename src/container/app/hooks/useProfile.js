import { useMutation, useQuery } from '@tanstack/react-query'
import { profileAPIService } from '../services/profileAPIService'

export const useGetProfile = payload => {
  const { data, isLoading, error, refetch } = useQuery(
    ['useGetProfile'],
    () => profileAPIService.getProfile(),
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
    profile: data,
    isLoading,
    error,
    refetchProfile: refetch,
  }
}
