import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Brand } from '@/components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import LinearGradient from 'react-native-linear-gradient'

const StartupContainer = () => {
  const { Layout, Gutters } = useTheme()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 3000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Auth')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand height={211} width={193} />
    </View>
  )
}

export default StartupContainer
