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

const FeedbackContainer = () => {
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
      setResetSend(true);
      setErrorMessage({
        email: ''
      })
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
        

      <View style={[
          Layout.column,
          Gutters.regularVMargin,
        ]} />

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.regularBMargin]}>
        <Text style={Fonts.titleBold}>
            Feedback
        </Text>
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
            <Text style={Fonts.textButton}>{"Submit"}</Text>
        </TouchableOpacity>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default FeedbackContainer
