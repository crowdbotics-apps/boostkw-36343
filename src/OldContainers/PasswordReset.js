import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, Title } from '@/components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { checkEmail } from '@/Utils/Validations'
import { request } from '@/util/http'

const PasswordReset = ({ navigation }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: '',
  })

  const [resetSend, setResetSend] = useState(false)

  const onNavigateLogin = () => {
    navigation.navigate('Login')
  }

  const onClickNext = () => {
    // do paswword reset request
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter email',
      })
    } else {
      sendReset(values)
      setErrorMessage({
        email: '',
      })
    }
  }

  const sendReset = async ({ email }) => {
    try {
      const response = await request.post(`accounts/password/reset/`, {
        email: email,
      })
      if (response) {
        console.log(response.data)
        setResetSend(true)
      }
    } catch (error) {
      console.log('Error: user password reset', error)
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  // console.log(errorMessage);

  return (
    <ScrollView
      style={[Layout.fill]}
      contentContainerStyle={[Layout.fill, Layout.column]}
    >
      <LinearGradient
        colors={['#000A62', '#00063C']}
        style={[Layout.fill, Gutters.smallHPadding]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[
              Layout.colCenter,
              Gutters.smallHPadding,
              Gutters.regularBMargin,
              Gutters.largeTMargin,
            ]}
          >
            <Brand />
          </View>

          <View style={[Layout.column, Gutters.regularVMargin]} />

          <View
            style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}
          >
            <Title
              text={'Reset Password'}
              onPressBack={
                resetSend ? () => setResetSend(false) : onNavigateLogin
              }
            />
          </View>

          <View
            style={[
              Layout.rowCenter,
              Gutters.smallHPadding,
              Gutters.regularVMargin,
              Fonts.textCenter,
            ]}
          >
            {resetSend ? (
              <Text
                style={[
                  Fonts.textButtonSmall,
                  Fonts.textCenter,
                  Gutters.smallHPadding,
                ]}
              >{`We have sent you instructions to change your password to ${values.email}`}</Text>
            ) : (
              <Text
                style={[
                  Fonts.textButtonSmall,
                  Fonts.textCenter,
                  Gutters.smallHPadding,
                ]}
              >
                Enter the email associated with your account and we will send
                you a link to reset your password.
              </Text>
            )}
          </View>

          {!resetSend && (
            <View
              style={[
                Layout.column,
                Gutters.smallHPadding,
                Gutters.regularVMargin,
              ]}
            >
              <Input
                error={!!errorMessage?.email?.length}
                errorValue={errorMessage?.email}
                onChangeText={v => onChange('email', v.trim())}
                value={values.email}
                placeholder="Enter your email"
                placeholderTextColor={'#ffffff'}
                selectTextOnFocus
              />
            </View>
          )}

          <View
            style={[Layout.column, Gutters.smallHPadding, Gutters.smallVMargin]}
          >
            <TouchableOpacity
              style={[Common.button.outlineRounded, Gutters.regularBMargin]}
              onPress={resetSend ? onNavigateLogin : onClickNext}
            >
              <Text style={Fonts.textButton}>
                {resetSend ? 'Go To Login' : 'Reset'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  )
}

export default PasswordReset