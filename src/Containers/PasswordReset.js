import React,  { useState }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, Title } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { checkEmail } from '@/Utils/Validations'
import { request } from '@/Utils/http'

const PasswordReset = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: "",
  })

  const [resetSend, setResetSend] = useState(false);


  const onNavigateLogin = () => {
    navigate('Login')
  }

  const onClickNext = () => {
    // do paswword reset request
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...errorMessage,
      email: "Please enter email"
      })
    } else {
      sendReset(values)
      setErrorMessage({
        email: ''
      })
    }
  }


  const sendReset = async ({ email }) => {
    try {

      const response = await request.post(
        `accounts/password/reset/`, {
          email: email
        }
        )
      if (response) {
        setResetSend(true);
      }
    } catch (error) {
      console.log("Error: user password reset", error)
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
    
  // console.log(errorMessage);

  return (
    <ScrollView
      style={[Layout.fill]}
      contentContainerStyle={[
        Layout.fill,
        Layout.column,
      ]}
    >
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill, Gutters.smallHPadding,]}>
        
      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.regularBMargin, Gutters.largeTMargin]}>
        <Brand />
      </View>

      <View style={[
          Layout.column,
          Gutters.regularVMargin,
        ]} />

      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <Title 
            text={"Reset Password"}
            onPressBack={onNavigateLogin}
          />
      </View>

      <View
            style={[
            Layout.rowCenter,
            Gutters.smallHPadding,
            Gutters.regularVMargin,
            Fonts.textCenter
            ]}
        >
            {
            resetSend ? 
            <Text style={[Fonts.textButtonSmall, Fonts.textCenter, Gutters.smallHPadding]}>{`We have sent you instructions to change your password to ${values.email}`}</Text>
            :
            <Text style={[Fonts.textButtonSmall, Fonts.textCenter, Gutters.smallHPadding]}>Enter the email associated with your account and we will send you a link to reset your password.</Text>
            }
            
        </View>

      { 
      !resetSend &&
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
            onChangeText={v => onChange("email", v.trim())}
            value={values.email}
            placeholder='Enter your email'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
          />
            
      </View>
      }


      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
        ]}
      >
        <TouchableOpacity
            style={[Common.button.outlineRounded, Gutters.regularBMargin]}
            onPress={resetSend ? onNavigateLogin : onClickNext}
        >
            <Text style={Fonts.textButton}>{resetSend ? "Go To Login" : "Reset"}</Text>
        </TouchableOpacity>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default PasswordReset