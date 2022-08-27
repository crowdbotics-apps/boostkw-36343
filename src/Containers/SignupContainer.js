import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import FastImage from "react-native-fast-image"

const SignUpContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()

  const onClickBack = () => {
    navigate('Login')
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

      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <View
                style={[
                 Layout.row,
                 Layout.scrollSpaceBetween,
                 Layout.alignItemsCenter
                ]}
            >
              <TouchableOpacity
                    onPress={onClickBack}
                >
                    
                    <FastImage
                        style={[{width: 12, height: 19}]}
                        source={Images.leftArrow}
                    />
              </TouchableOpacity>
              <Text style={[Fonts.titleBold, Fonts.textCenter]}>
                    Sing Up
              </Text>
              <View/>
          </View>
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

        <Input
            //   onChangeText={setUserId}
            //   editable={!isLoading}
            //   value={userId}
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
          Gutters.regularVMargin,
        ]}
      >
      <TouchableOpacity
        style={[Common.button.outlineRounded]}
        onPress={() => {}}
      >
        <Text style={Fonts.textButton}>Next</Text>
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
