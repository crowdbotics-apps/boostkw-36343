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

const PrivacyContainer = () => {
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

      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <Title 
            text={"Privacy Policy"}
            onPressBack={onNavigateLogin}
            textStyle={Fonts.titleBoldTerms}
            terms={true}
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
          <Text style={[Fonts.textButtonSmall, Fonts.textCenter, Gutters.smallHPadding]}>Privacy Policy for BOOSTKW</Text>
            
      </View>


      </LinearGradient>
    </ScrollView>
  )
}

export default PrivacyContainer
