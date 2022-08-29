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
import { navigate } from '@/Navigators/utils'

const LoginContainer = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [remember, setRemember] = useState(false);

  const onClickSignup = () => {
    navigate('SignUp')
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
            //   onChangeText={setUserId}
            //   editable={!isLoading}
            //   value={userId}
            placeholder='Email'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            //   onChangeText={setUserId}
            //   editable={!isLoading}
            //   value={userId}
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
              <Text style={[Fonts.textNormal, Fonts.textGray, Gutters.smallHPadding]}>Remember Me</Text>
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
        onPress={() => {}}
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
