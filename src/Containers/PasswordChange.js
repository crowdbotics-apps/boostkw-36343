import React,  { useState }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Input, Title } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { request } from '@/Utils/http'

const PasswordChange = ({ navigation }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const onClickChange = () => {
    // do paswword reset request
    if (!values.password) {
      setErrorMessage({
        ...errorMessage,
      password: "Please enter current password",
      newPassword: "",
      confirmNewPassword: ""
      })
    }
    else if (values.newPassword?.length < 8) {
      setErrorMessage({
        ...errorMessage,
        password: "",
        newPassword: "This password is too short",
        confirmNewPassword: ""
      })
    }
    else if (!values.newPassword) {
      setErrorMessage({
        ...errorMessage,
        password: "",
        newPassword: "Please enter new password",
        confirmNewPassword: ""
      })
    }
    else if (!values.confirmNewPassword) {
      setErrorMessage({
        ...errorMessage,
        password: "",
        newPassword: "",
        confirmNewPassword: "Please confirm new password"
      })
    } else {
      setErrorMessage({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      })
      changePassword(values)
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  const onClickBack = () => {
    navigation.goBack()
  }

  const changePassword = async ({ newPassword, confirmNewPassword }) => {
    try {
      const formData = new FormData();
      newPassword && formData.append("new_password1", newPassword);
      confirmNewPassword && formData.append("new_password2", confirmNewPassword);

      const response = await request.post(
        `accounts/password/change/`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
            // "Content-Type": "application/json"
          },
          // transformRequest: formData => formData
        })
      if (response) {
        console.log('password: ', response.data)
        onClickBack()
      }
    } catch (error) {
      console.log("Error: user password change", error)
    }
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
        

      <View style={[
          Layout.column,
          Gutters.regularVMargin,
        ]} />

      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin, Gutters.smallTMargin]}>
          <Title 
            text={"Change password"}
            onPressBack={onClickBack}
          />
        </View>

        <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
        ]}
      >
        <Input
            error={!!errorMessage?.password?.length}
            errorValue={errorMessage?.password}
            onChangeText={v => onChange("password", v.trim())}
            value={values.password}
            placeholder='Old Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />

        <Input
            error={!!errorMessage?.newPassword?.length}
            errorValue={errorMessage?.newPassword}
            onChangeText={v => onChange("newPassword", v.trim())}
            value={values.newPassword}
            placeholder='New Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />

        <Input
            error={!!errorMessage?.confirmNewPassword?.length}
            errorValue={errorMessage?.confirmNewPassword}
            onChangeText={v => onChange("confirmNewPassword", v.trim())}
            value={values.confirmNewPassword}
            placeholder='Confirm Password'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            password={true}
            />

      </View>


      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
        ]}
      >
        <TouchableOpacity
            style={[Common.button.outlineRounded, Gutters.regularBMargin]}
            onPress={onClickChange}
        >
            <Text style={Fonts.textButton}>{"Submit"}</Text>
        </TouchableOpacity>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default PasswordChange
