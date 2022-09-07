import React, { useState, useEffect, useRef } from 'react'
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
import { checkEmail, checkPassword } from '@/Utils/Validations'
import { Branch } from '@/Utils/Branch'
import { Jobs } from '@/Utils/Jobs'
import ImagePicker from "react-native-image-crop-picker"
import { request } from '@/Utils/http'

const SignUpContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()
  const [nextPage, setNextPage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [crewList, setCrewList] = useState([]);


  useEffect(() => {
    !crewList.length && fetchCrew()
  }, [])

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
    resetPassword: "",
    firstName: "",
    lastName: ""

  })

  const fetchCrew = async () => {
    try {
      const response = await request.get(`crews/`)
      if (response) {
        const data = response.data?.map((item) => {
          return { name: item.name, value: item.id }
        })
        setCrewList(data);
      }
      } catch (error) {
        console.log("Error: crew list", error)
      }
  }

  const onNavigateLogin = () => {
    navigate('Login')
  }

  const onClickNext = () => {
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...values,
      email: "Please enter your email",
      password: "",
      resetPassword: "",
      firstName: '',
      lastName: ''
      })
    }
    else if (!values.password) {
      setErrorMessage({
        ...values,
      email: "",
      password: "Please enter your password",
      resetPassword: "",
      firstName: '',
      lastName: ''
      })
    }
    else if (!values.resetPassword) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "Please confirm your password",
      firstName: '',
      lastName: ''
      })
     }
     else if (values.password !== values.resetPassword) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "Password doesn't match",
      firstName: '',
      lastName: ''
      })
     }
     else if (!checkPassword(values.resetPassword)) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "Password must have at least one character and number",
      firstName: '',
      lastName: ''
      })
     } else {
      setNextPage(true)
      setErrorMessage({
        email: '',
        password: '',
        resetPassword: '',
        firstName: '',
        lastName: ''
      })
    }
  }

  const onClickSignUp = () => {
    if (!values.firstName) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "",
      firstName: "Please enter your first name",
      lastName: ""
      })
    } 
    else if (!values.lastName) {
      setErrorMessage({
        ...values,
      email: "",
      password: "",
      resetPassword: "",
      firstName: '',
      lastName: "Please enter your last name"
      })
     } else {
      setErrorMessage({
        email: '',
        password: '',
        resetPassword: '',
        firstName: '',
        lastName: ''
      })
      doSignUp({...values, image: profileImage})
     }

  }

  const doSignUp = async ({ image, email, password, firstName, lastName, branch, crewName, jobTitle}) => {
    try {
      // console.log(email, password, firstName, lastName, branch, jobTitle);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("branch", branch);
      formData.append("crew", crewName);
      formData.append("job_title", jobTitle);
      image && formData.append("profile_picture", {
        uri: image?.sourceURL || image?.path,
        type: image?.mime || 'image/jpg',
        name: image.filename || firstName+'profile.jpg',
      });

      // console.log(formData);
      const response = await request.post(
        `accounts/signup/`,
        formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
            // "Content-Type": "application/json"
          },
          // transformRequest: formData => formData
        })
      if (response) {
        console.log('user reg: ', response.data)
        onNavigateLogin()
      }
    } catch (error) {
      console.log("Error: user signup", error)
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

  const onPressImage = (camera) => {
    if(camera) {
      ImagePicker.openCamera({
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
    else {
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
  }

  return (
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill]}>
    <ScrollView
      style={[Layout.fill]}
      contentContainerStyle={[
        Layout.column,
        Gutters.smallHPadding
      ]}
    >
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
              source={{ uri: profileImage?.sourceURL || profileImage?.path}}
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
              {!(profileImage?.sourceURL || profileImage?.path) &&
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
      !nextPage && 
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

      </View>
    }

    {
      nextPage &&
      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
        ]}
      >
        <Input
            error={!!errorMessage?.firstName?.length}
            errorValue={errorMessage?.firstName}
            onChangeText={v => onChange("firstName", v.trim())}
            value={values.firstName}
            placeholder='First Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.lastName?.length}
            errorValue={errorMessage?.lastName}
            onChangeText={v => onChange("lastName", v.trim())}
            value={values.lastName}
            placeholder='Last Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        {
          values?.branch && 
          <View>
            <Text style={[Fonts.labelText]}>{"Branch"}</Text>
          </View>
        }
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

        {
          values?.crewName && 
          <View>
            <Text style={[Fonts.labelText]}>{"Crew Name"}</Text>
          </View>
        }
        <SelectItem 
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              onChange("crewName", selectedItem.value)
            }}
            data={crewList}
            defaultText="Crew Name"
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.name
            }}
            rowTextForSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.name
          }}
          />

          {
          values?.jobTitle && 
          <View>
            <Text style={[Fonts.labelText]}>{"Job Title"}</Text>
          </View>
        }
          <SelectItem 
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              onChange("jobTitle", selectedItem.value)
            }}
            data={Jobs}
            defaultText="Job Title"
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.name
            }}
            rowTextForSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.name
          }}
          />
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
        onPress={nextPage ? onClickSignUp : onClickNext}
      >
        <Text style={Fonts.textButton}>{nextPage ? "Sign up" : "Next"}</Text>
      </TouchableOpacity>

      </View>

      {
        !nextPage &&

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
      }

    </ScrollView>
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
  )
}

export default SignUpContainer
