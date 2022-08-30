import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, SelectItem, Title } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import FastImage from "react-native-fast-image"
import { checkEmail } from '@/Utils/Validations'

const SignUpContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()
  const [nextPage, setNextPage] = useState(true);

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    resetPassword: ""
  })

  const onNavigateLogin = () => {
    navigate('Login')
  }

  const onClickNext = () => {
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...values,
      email: "Please enter your email",
      password: "",
      resetPassword: ""
      })
    }
    else if (!values.password) {
      setErrorMessage({
        ...values,
      email: "",
      password: "Please enter your password",
      resetPassword: ""
      })
    }
    else if (!values.password) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "Please confirm your password"
      })
     } else {
      setNextPage(true)
      setErrorMessage({
        email: '',
        password: '',
        resetPassword: ''
      })
    }
  }

  const onClickBack = () => {
    setNextPage(false)
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
    

  return (
    <ScrollView
      style={[Layout.fill]}
      contentContainerStyle={[
        Layout.fill,
        Layout.column,
      ]}
    >
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill, Gutters.smallHPadding,]}>
      {
        !nextPage &&
        <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.regularBMargin, Gutters.largeTMargin]}>
          <Brand />
        </View>
      }
      
      <View style={[
          Layout.column,
          Gutters.regularVMargin,
        ]} />

      {
        nextPage ?
        <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <Title 
            text={"Set up account"}
            onPressBack={onClickBack}
          />
        </View>
      :
      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <View
                style={[
                 Layout.row,
                 Layout.scrollSpaceBetween,
                 Layout.alignItemsCenter
                ]}
            >
              <TouchableOpacity
                    onPress={onNavigateLogin}
                >
                    
                    <FastImage
                        style={[{width: 12, height: 19}]}
                        source={Images.leftArrow}
                    />
              </TouchableOpacity>
              <Text style={[Fonts.titleBold, Fonts.textCenter]}>
                    Sign Up
              </Text>
              <View/>
          </View>
      </View>
      }

    {
      nextPage ? 
      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
        ]}
      >
        <Input
            error={!!errorMessage?.FirstName?.length}
            errorValue={errorMessage?.FirstName}
            onChangeText={v => onChange("FirstName", v.trim())}
            placeholder='First Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.LastName?.length}
            errorValue={errorMessage?.LastName}
            onChangeText={v => onChange("LastName", v.trim())}
            placeholder='Last Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />


        {/* <SelectItem /> */}
      </View>

      :

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
            placeholder='Email'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.password?.length}
            errorValue={errorMessage?.password}
            onChangeText={v => onChange("password", v.trim())}
            placeholder='Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />

        <Input
            error={!!errorMessage?.resetPassword?.length}
            errorValue={errorMessage?.resetPassword}
            onChangeText={v => onChange("resetPassword", v.trim())}
            placeholder='Confirm Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />

        {/* <SelectItem /> */}
      </View>

    }
      

      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
        ]}
      >
      <TouchableOpacity
        style={[Common.button.outlineRounded]}
        onPress={onClickNext}
      >
        <Text style={Fonts.textButton}>{nextPage ? "Sign up" : "Next"}</Text>
      </TouchableOpacity>

      </View>

      <View
        style={[
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
            Fonts.textCenter
            ]}
        >
            <Text style={[Fonts.textButtonSmall, Fonts.textCenter]}>By using BOOSTKW you agree to our Terms and Conditions and Privacy Policy</Text>
        </View>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default SignUpContainer
