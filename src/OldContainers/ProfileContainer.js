import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Title, SelectItem, ActionSheet } from '@/components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { checkEmail } from '@/Utils/Validations'
import { Branch } from '@/Utils/Branch'
import { Jobs } from '@/Utils/Jobs'
import ImagePicker from 'react-native-image-crop-picker'
import { request } from '@/util/http'
import FastImage from 'react-native-fast-image'
import { logOut, setProfile } from '@/Services/modules/auth'
import { setLoggedIn } from '@/Services/modules/app'

const ProfileContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()

  const authUser = useSelector(state => state.auth?.profile)

  const [profileImage, setProfileImage] = useState(null)
  const [crewList, setCrewList] = useState([])

  useEffect(() => {
    !crewList.length && fetchCrew()
    !authUser && getProfile()
  }, [])

  useEffect(() => {
    if (authUser?.crew?.id) {
      onChange('crewName', authUser?.crew?.id)
    }
    if (authUser?.profile?.branch) {
      onChange('branch', authUser?.profile?.branch)
    }
    if (authUser?.profile?.job_title) {
      onChange('jobTitle', authUser?.profile?.job_title)
    }
    // if(authUser?.first_name){
    //   onChange("firstName", authUser?.first_name)
    // }
    // if(authUser?.last_name){
    //   onChange("lastName", authUser?.last_name)
    // }
  }, [authUser])

  const jobTitle =
    authUser?.profile?.job_title &&
    Jobs.find(i => i.value === authUser?.profile?.job_title)

  const modalizeRef = useRef(null)

  const OpenModal = () => {
    modalizeRef.current?.open()
  }

  const CloseModal = () => {
    modalizeRef.current?.close()
  }

  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    email: '',
  })

  const onClickSave = () => {
    doProfileUpdate({ ...values, image: profileImage })
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  const fetchCrew = async () => {
    try {
      const response = await request.get(`crews/`)
      if (response) {
        const data = response.data?.map(item => {
          return { name: item.name, value: item.id }
        })
        setCrewList(data)
      }
    } catch (error) {
      console.log('Error: crew list', error)
    }
  }

  const getProfile = async () => {
    try {
      const response = await request.get(`accounts/profile/`)
      if (response) {
        // console.log('profile', response.data);
        dispatch(setProfile({ profile: response.data }))
      }
    } catch (error) {
      console.log('Error: profile', error)
    }
  }

  const onPressImage = camera => {
    if (camera) {
      ImagePicker.openCamera({
        width: 500,
        height: 500,
        mediaType: 'photo',
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.5,
      }).then(res => {
        console.log('Image', res)
        setProfileImage(res)
        CloseModal()
      })
    } else {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        mediaType: 'photo',
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.5,
      }).then(res => {
        // console.log("Image", res)
        setProfileImage(res)
        CloseModal()
      })
    }
  }

  const onLogout = () => {
    dispatch(logOut())
    doLogout()
  }

  const doLogout = async () => {
    try {
      const response = await request.post(`accounts/logout/`)
      if (response) {
        console.log('logged out')
        dispatch(setLoggedIn({ loggedIn: false }))
      }
    } catch (error) {
      console.log('Error: logout', error)
    }
  }

  const doProfileUpdate = async ({
    image,
    firstName,
    lastName,
    branch,
    crewName,
    jobTitle,
  }) => {
    try {
      // console.log(firstName, lastName, branch, jobTitle);
      const formData = new FormData()
      firstName && formData.append('first_name', firstName)
      lastName && formData.append('last_name', lastName)
      branch && formData.append('profile.branch', branch)
      crewName && formData.append('crew', crewName)
      jobTitle && formData.append('profile.job_title', jobTitle)
      image &&
        formData.append('profile_picture', {
          uri: image?.sourceURL || image?.path,
          type: image?.mime || 'image/jpg',
          name:
            image.filename ||
            (firstName || authUser?.first_name) + 'profile.jpg',
        })

      // console.log(formData);
      const response = await request.patch(`accounts/profile/`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          // "Content-Type": "application/json"
        },
        // transformRequest: formData => formData
      })
      if (response) {
        console.log('user profile: ', response.data)
        dispatch(setProfile({ profile: response.data }))
        Alert.alert('Saved', 'Profile updated successfully.')
      }
    } catch (error) {
      console.log('Error: user PROFILE', error)
    }
  }

  const navigatePasswordChange = () => {
    navigate('PasswordChange')
  }

  console.log(authUser)

  return (
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill]}>
      <ScrollView style={[Layout.fill]} contentContainerStyle={[Layout.column]}>
        <View
          style={[Layout.column, Gutters.regularVMargin, Gutters.smallHPadding]}
        />

        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[
              Layout.colCenter,
              Gutters.smallHPadding,
              Gutters.regularBMargin,
            ]}
          >
            <Text style={Fonts.titleBold}>Profile</Text>
          </View>

          <View
            style={[
              Layout.colCenter,
              Gutters.mediumHPadding,
              Gutters.smallVMargin,
            ]}
          >
            <ImageBackground
              source={{
                uri:
                  profileImage?.sourceURL ||
                  profileImage?.path ||
                  authUser?.profile_picture,
              }}
              style={[
                Layout.colCenter,
                {
                  borderRadius: 150 / 2,
                  height: 164,
                  width: 164,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                },
              ]}
              imageStyle={{
                borderRadius: 150 / 2,
                overflow: 'hidden',
              }}
              resizeMode="cover"
              // source={}
            ></ImageBackground>
          </View>

          <View
            style={[
              Layout.rowCenter,
              Gutters.mediumHPadding,
              Gutters.smallVMargin,
            ]}
          >
            <Text
              onPress={OpenModal}
              style={[Fonts.textButton, { color: '#89BEFF' }]}
            >
              Change photo
            </Text>
          </View>

          <View
            style={[
              Layout.rowCenter,
              Gutters.mediumHPadding,
              Gutters.regularVMargin,
            ]}
          />

          <View
            style={[
              Layout.colHCenter,
              Gutters.regularBMargin,
              {
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.12)',
              },
            ]}
          >
            <Text
              style={[
                Gutters.mediumHPadding,
                Gutters.smallVMargin,
                Fonts.labelText,
              ]}
            >
              Email
            </Text>
            <Text
              style={[
                Gutters.mediumHPadding,
                Gutters.smallBMargin,
                Fonts.textButton,
              ]}
            >
              {authUser?.email}
            </Text>
          </View>

          <View
            style={[
              Layout.column,
              Gutters.mediumHPadding,
              Gutters.smallBMargin,
            ]}
          >
            {/* <Input
            value={authUser?.email}
            placeholder="Email"
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            editable={false}
          /> */}

            <Input
              error={!!errorMessage?.firstName?.length}
              errorValue={errorMessage?.firstName}
              onChangeText={v => onChange('firstName', v.trim())}
              value={values.firstName || authUser?.first_name}
              placeholder="First Name"
              placeholderTextColor={'#ffffff'}
              selectTextOnFocus={true}
            />

            <Input
              error={!!errorMessage?.lastName?.length}
              errorValue={errorMessage?.lastName}
              onChangeText={v => onChange('lastName', v.trim())}
              value={values.lastName || authUser?.last_name}
              placeholder="Last Name"
              placeholderTextColor={'#ffffff'}
              selectTextOnFocus={true}
            />

            {(values?.branch || authUser?.profile?.branch) && (
              <View style={[Gutters.tinyTMargin]}>
                <Text style={[Fonts.labelText]}>{'Branch'}</Text>
              </View>
            )}
            <SelectItem
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                onChange('branch', selectedItem.trim())
              }}
              data={Branch}
              defaultText={authUser?.profile?.branch || 'Branch'}
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

            {(values?.crewName || authUser?.crew?.id) && (
              <View style={[Gutters.tinyTMargin]}>
                <Text style={[Fonts.labelText]}>{'Crew Name'}</Text>
              </View>
            )}
            <SelectItem
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                onChange('crewName', selectedItem.value)
              }}
              data={crewList}
              defaultText={authUser?.crew?.name || 'Crew Name'}
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

            {(values?.jobTitle || authUser?.profile?.job_title) && (
              <View style={[Gutters.tinyTMargin]}>
                <Text style={[Fonts.labelText]}>{'Job Title'}</Text>
              </View>
            )}
            <SelectItem
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                onChange('jobTitle', selectedItem.value)
              }}
              data={Jobs}
              defaultText={jobTitle?.name || 'Job Title'}
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

          <View
            style={[
              Layout.column,
              Gutters.mediumHPadding,
              Gutters.smallVMargin,
            ]}
          >
            <TouchableOpacity
              style={[Common.button.outlineRounded, Gutters.regularBMargin]}
              onPress={onClickSave}
            >
              <Text style={Fonts.textButton}>{'Save'}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.regularVMargin,
              Gutters.regularVPadding,
              {
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.12)',
              },
            ]}
          >
            <Text
              onPress={navigatePasswordChange}
              style={[
                Gutters.mediumHPadding,
                Gutters.tinyVMargin,
                Fonts.textButton,
              ]}
            >
              Change Password
            </Text>
            <TouchableOpacity
              style={[Gutters.mediumHPadding]}
              onPress={navigatePasswordChange}
            >
              <FastImage
                style={[{ width: 9, height: 15 }]}
                source={Images.rightArrow}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.regularBMargin,
              Gutters.regularBPadding,
              {
                borderBottomWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.12)',
              },
            ]}
          >
            <Text
              onPress={onLogout}
              style={[
                Gutters.mediumHPadding,
                Gutters.tinyVMargin,
                Fonts.textButton,
              ]}
            >
              Sign Out
            </Text>
            <TouchableOpacity
              style={[Gutters.mediumHPadding]}
              onPress={onLogout}
            >
              <FastImage
                style={[{ width: 9, height: 15 }]}
                source={Images.rightArrow}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>

      <ActionSheet
        modalRef={modalizeRef}
        OpenModal={OpenModal}
        CloseModal={CloseModal}
        onPress={onPressImage}
        icon={Images.imageIcon}
      />
    </LinearGradient>
  )
}

export default ProfileContainer