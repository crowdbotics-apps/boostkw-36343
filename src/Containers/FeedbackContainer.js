import React,  { useState }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand, Input, Title } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { checkEmail } from '@/Utils/Validations'
import Stars from 'react-native-stars';

const FeedbackContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()

  const [ star, setStar ] = useState(4);
  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    messgae: "",
  })


  const onClickSubmit = () => {
    // do paswword reset request
    if (!checkEmail(values.email)) {
      setErrorMessage({
        ...errorMessage,
      messgae: "Please enter response"
      })
    } else {
      setErrorMessage({
        messgae: ''
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

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.largeBMargin]}>
        <Text style={Fonts.titleBold}>
          How do you like
        </Text>
        <Text style={Fonts.titleBold}>
          using TrackNapp?
        </Text>
      </View>

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.largeBMargin]}>
        <Stars
            default={star}
            update={(val) => { setStar(val) }}
            spacing={15}
            starSize={35}
            count={5}
            fullStar={Images.starFill}
            emptyStar={Images.star}
            />
      </View>

      <View style={[Layout.colCenter, Gutters.smallHPadding, Gutters.regularBMargin]}>
        <Text style={[Fonts.subTitle, Fonts.textCenter, Gutters.smallHPadding]}>
          What would you change
        </Text>
        <Text style={[Fonts.subTitle, Fonts.textCenter, Gutters.smallHPadding]}>
          about the application?
        </Text>
      </View>

      <View
        style={[
          Layout.column,
          Gutters.smallHPadding,
          Gutters.regularVMargin,
          { minHeight: 128 }
        ]}
      >
        <TextInput
            style={
              [
                Layout.fill, 
                Common.textBoxInput, 
              ]
            }
            placeholder={"Your response"}
            multiline={true}
            numberOfLines={5}
            onChangeText={v => onChange("messgae", v.trim())}
            color={'#ffffff'}
            placeholderTextColor={
              "#ffffff"
            }
            value={values?.messgae || null}
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
            onPress={onClickSubmit}
        >
            <Text style={Fonts.textButton}>{"Submit"}</Text>
        </TouchableOpacity>

      </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default FeedbackContainer
