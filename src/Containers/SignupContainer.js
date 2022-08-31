import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, SelectItem, Title, ActionSheet } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import FastImage from "react-native-fast-image"
import { checkEmail } from '@/Utils/Validations'
import { Branch } from '@/Utils/Branch'
import { Jobs } from '@/Utils/Jobs'
import ImagePicker from "react-native-image-crop-picker"

const SignUpContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()
  const [nextPage, setNextPage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const modalizeRef = useRef(null);

  const OpenModal = () => {
    modalizeRef.current?.open();
  }

  const CloseModal = () => {
    modalizeRef.current?.close();
  }

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

  const onPressImage = () => {
    ImagePicker.openPicker({
        width: 500,
        height: 500,
        mediaType: "photo",
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.5
      }).then(res => {
        console.log("Image", res)
        setProfileImage(res)
        CloseModal()
      })
  }

  console.log(profileImage);

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
        <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin, Gutters.smallTMargin]}>
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
        nextPage &&
        <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.smallVMargin,]}>
            <ImageBackground
              source={{ uri: profileImage?.sourceURL}}
              style={[
                Layout.colCenter,
                {
                  borderRadius: 150 / 2,
                  height: 164, 
                  width: 164,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                }
            ]
            }
              imageStyle={{ 
                borderRadius: 150 / 2,
                overflow: "hidden",
              }}
              resizeMode="cover"
              // source={}
            >
              {!profileImage?.sourceURL &&
              <TouchableOpacity
                style={[Layout.colCenter]}
                onPress={OpenModal}
              >
                <FastImage 
                  style={[{width: 49, height: 57}]}
                  source={Images.userIcon}
                />
                <Text style={[Fonts.textButton, { color: '#338AF4', paddingTop: 10}]}>Upload Photo</Text>
              </TouchableOpacity>
              }
            </ImageBackground>
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
            value={values.FirstName}
            placeholder='First Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.LastName?.length}
            errorValue={errorMessage?.LastName}
            onChangeText={v => onChange("LastName", v.trim())}
            value={values.LastName}
            placeholder='Last Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />


        <SelectItem 
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            onChange("branch", selectedItem.trim())
          }}
          data={Branch}
          defaultText="Branch"
          buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
          }}
          rowTextForSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
        }}
          />

        <SelectItem 
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              onChange("crewName", selectedItem.trim())
            }}
            data={Branch}
            defaultText="Crew Name"
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
          }}
          />

          <SelectItem 
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              onChange("jobTitle", selectedItem.trim())
            }}
            data={Jobs}
            defaultText="Job Title"
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
          }}
          />
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
            value={values.email}
            onChangeText={v => onChange("email", v.trim())}
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

        <Input
            error={!!errorMessage?.resetPassword?.length}
            errorValue={errorMessage?.resetPassword}
            onChangeText={v => onChange("resetPassword", v.trim())}
            value={values.resetPassword}
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
            <Text style={[Fonts.textButtonSmall, Fonts.textCenter]}>By using BOOSTKW you agree to our <Text style={{color: "#338AF4"}} onPress={() => navigate('Terms')}>Terms and Conditions</Text> and <Text style={{color: "#338AF4"}} onPress={() => navigate('Privacy')}>Privacy Policy</Text></Text>
        </View>

      </View>

      {
        nextPage &&
        <ActionSheet
          modalRef={modalizeRef}
          OpenModal={OpenModal}
          CloseModal={CloseModal}
          onPress={onPressImage}
          icon={Images.imageIcon}
        />
      }

      </LinearGradient>
    </ScrollView>
  )
}

export default SignUpContainer
