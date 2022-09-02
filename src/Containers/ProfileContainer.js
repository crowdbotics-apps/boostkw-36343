import React,  { useState, useEffect, useRef }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Brand, Input, Title, SelectItem, ActionSheet } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { checkEmail } from '@/Utils/Validations'
import { Branch } from '@/Utils/Branch'
import { Jobs } from '@/Utils/Jobs'
import ImagePicker from "react-native-image-crop-picker"
import { request } from '@/Utils/http'

const ProfileContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth?.user?.user)

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
  })


  const onClickSave = () => {
    // do paswword reset request
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...errorMessage,
      email: "Please enter email"
      })
    } else {
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


  console.log(authUser);

  return (
    <ScrollView
      style={[Layout.fill]}
      contentContainerStyle={[
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
            Profile
        </Text>
      </View>

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.smallVMargin,]}>
            <ImageBackground
              source={{ uri: profileImage?.sourceURL || authUser?.profile_picture}}
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
            </ImageBackground>
        </View>

        <View
            style={[
            Layout.rowCenter,
            Gutters.smallHPadding,
            Gutters.smallVMargin,
            ]}
        >
            <Text style={[Fonts.textButton, { color: '#89BEFF'}]}>Change photo</Text>
            
        </View>


      <View
            style={[
            Layout.rowCenter,
            Gutters.smallHPadding,
            Gutters.regularVMargin,
            Fonts.textCenter
            ]}
        >
            
            
        </View>

      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
        ]}
      >

        <Input
            value={authUser?.email}
            placeholder="Email"
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            editable={false}
          />

        <Input
            error={!!errorMessage?.firstName?.length}
            errorValue={errorMessage?.firstName}
            onChangeText={v => onChange("firstName", v.trim())}
            value={values.firstName || authUser?.first_name}
            placeholder='First Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        <Input
            error={!!errorMessage?.lastName?.length}
            errorValue={errorMessage?.lastName}
            onChangeText={v => onChange("lastName", v.trim())}
            value={values.lastName || authUser?.last_name}
            placeholder='Last Name'
            placeholderTextColor={"#ffffff"}
            selectTextOnFocus
            />

        {
          (values?.branch || authUser?.branch) && 
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


      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
        ]}
      >
        <TouchableOpacity
            style={[Common.button.outlineRounded, Gutters.regularBMargin]}
            onPress={onClickSave}
        >
            <Text style={Fonts.textButton}>{"Save"}</Text>
        </TouchableOpacity>

      </View>

      <ActionSheet
          modalRef={modalizeRef}
          OpenModal={OpenModal}
          CloseModal={CloseModal}
          onPress={onPressImage}
          icon={Images.imageIcon}
        />

      </LinearGradient>
    </ScrollView>
  )
}

export default ProfileContainer
