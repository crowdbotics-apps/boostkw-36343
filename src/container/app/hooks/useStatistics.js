import { useMutation, useQuery } from '@tanstack/react-query'
import { statisticsAPIService } from '../services/statisticsAPIService'

export const useGetStatistics = payload => {
  const { data, isLoading, error, refetch } = useQuery(
    ['useGetStatistics'],
    () => statisticsAPIService.getStatistics(),
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
    statistics: data,
    isLoading,
    error,
    refetchGetStatistics: refetch,
  }
}

export const useGetStatisticsDaily = payload => {
  const { data, isLoading, error, refetch } = useQuery(
    ['useGetStatisticsDaily', payload],
    () => statisticsAPIService.getStatisticsDaily(payload),
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
    dailyStatistics: data,
    isLoading,
    error,
    refectGetStatisticsDaily: refetch,
  }
}
