import React,  { useState }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, CheckBoxs } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
// import { checkEmail } from '@/Utils/Validations'
import { request } from '@/Utils/http'
import { setUser, setRemeberUser } from '@/Services/modules/auth'
import { setLoggedIn } from '@/Services/modules/app'

const LoginContainer = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  })

  const [remember, setRemember] = useState(false);

  const onClickSignup = () => {
    navigate('SignUp')
  }

  const onClickLogin = () => {
    if (!values.email) {
      setErrorMessage({
        ...values,
      email: "Please enter your email",
      password: "",
      })
    }
    else if (!values.password) {
      setErrorMessage({
        ...values,
      email: "",
      password: "Please enter your password"
      })
    } else {
      setErrorMessage({
        email: '',
        password: ''
      })
      // navigateAndSimpleReset('Main');
      doLogin(values)
    }
  }

  const doLogin = async ({ email, password}) => {

    try {
      const response = await request.post(
        `accounts/login/token/`,
        {
          username: email,
          password: password
        }
      )
      if (response) {
        dispatch(setUser({ user: response.data }))
        dispatch(setRemeberUser({ remember: remember}))
        dispatch(setLoggedIn({ loggedIn: true}))
        console.log('user: ', response.data)
      }
    } catch (error) {
      console.log("Error: user login", error)
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  // console.log(errorMessage, values)

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

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.regularBMargin]}>
        <Text style={Fonts.titleBold}>
            Login
        </Text>
      </View>

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
            placeholder='Email'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.password?.length}
            errorValue={errorMessage?.password}
            onChangeText={v => onChange("password", v.trim())}
            value={values.password}
            placeholder='Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />
            
      </View>

        <View
            style={[
            Layout.rowVCenter,
            Gutters.smallHPadding,
            Gutters.smallVMargin,
            Layout.justifyContentBetween,
            ]}
        >   
            <View 
              style={[
              Layout.rowVCenter,
              ]}
            >
              <CheckBoxs value={remember} onValueChange={() => setRemember(!remember)}  />
              <Text style={[Fonts.textNormal, Fonts.textGray, Gutters.smallHPadding]}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={() => navigate('PassReset')}>
              <Text style={Fonts.textNormal}>Forgot password?</Text>
            </TouchableOpacity>
        </View>

      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
        ]}
      >
      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={onClickLogin}
      >
        <Text style={Fonts.textButton}>Login</Text>
      </TouchableOpacity>

      </View>

      <View
        style={[
          Layout.fillFull,
          Layout.column,
          Layout.justifyContentEnd,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
        ]}
      >
      <View
        style={[
          Layout.rowCenter,
          Gutters.smallHPadding,
        ]}
      >
        <Text style={Fonts.textButton}>Don’t have an account?</Text>
        <TouchableOpacity onPress={onClickSignup}>
            <Text style={[Fonts.textButton, Fonts.fontBold, Gutters.smallHPadding]}>Sign up</Text>
        </TouchableOpacity>
      </View>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default LoginContainer
