import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { FeedbackAction } from '@/components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import Stars from 'react-native-stars'
import { request } from '@/util/http'
import { Header } from '@/components/Header'

const FeedbackContainer = () => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const dispatch = useDispatch()

  const [star, setStar] = useState(4)
  const [values, setValues] = useState({})
  const [errorMessage, setErrorMessage] = useState({
    comment: '',
  })

  const modalizeRef = useRef(null)

  const OpenModal = () => {
    modalizeRef.current?.open()
  }

  const CloseModal = () => {
    modalizeRef.current?.close()
  }

  const onClickSubmit = () => {
    // do paswword reset request
    if (!values.comment) {
      setErrorMessage({
        ...errorMessage,
        comment: 'Please enter response',
      })
    } else {
      sendFeedback({ comment: values?.comment, rating: star })
      setErrorMessage({
        comment: '',
      })
    }
  }

  const sendFeedback = async ({ comment, rating }) => {
    try {
      const response = await request.post(`feedbacks/user-feedback/`, {
        rating: rating,
        comment: comment,
      })
      if (response) {
        // console.log(response.data);
        OpenModal()
      }
    } catch (error) {
      console.log('Error: user feedback failed', error)
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    })
  }

  const onPressGotIt = () => {
    onChange('comment', '')
    CloseModal()
    navigate('Dashboard')
  }

  // console.log(errorMessage);

  return (
    <LinearGradient colors={['#000A62', '#00063C']} style={[Layout.fill]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={[Layout.fill]}
          contentContainerStyle={[Layout.column, Gutters.smallHPadding]}
        >
          <View style={[Layout.column, Gutters.regularVMargin]} />

          <View
            style={[
              Layout.colCenter,
              Gutters.smallHPadding,
              Gutters.largeBMargin,
            ]}
          >
            <Text style={Fonts.titleBold}>How do you like</Text>
            <Text style={Fonts.titleBold}>using BOOSTKW?</Text>
          </View>

          <View
            style={[
              Layout.colCenter,
              Gutters.smallHPadding,
              Gutters.largeBMargin,
            ]}
          >
            <Stars
              default={star}
              update={val => {
                setStar(val)
              }}
              spacing={15}
              starSize={35}
              count={5}
              fullStar={Images.starFill}
              emptyStar={Images.star}
            />
          </View>

          <View
            style={[
              Layout.colCenter,
              Gutters.smallHPadding,
              Gutters.regularBMargin,
            ]}
          >
            <Text
              style={[Fonts.subTitle, Fonts.textCenter, Gutters.smallHPadding]}
            >
              What would you change
            </Text>
            <Text
              style={[Fonts.subTitle, Fonts.textCenter, Gutters.smallHPadding]}
            >
              about the application?
            </Text>
          </View>

          <View
            style={[
              Layout.column,
              Gutters.smallHPadding,
              Gutters.regularVMargin,
              { minHeight: 128 },
            ]}
          >
            <TextInput
              style={[Layout.fill, Common.textBoxInput]}
              placeholder={'Your response'}
              multiline={true}
              numberOfLines={5}
              onChangeText={v => onChange('comment', v)}
              color={'#ffffff'}
              placeholderTextColor={'#ffffff'}
              value={values?.comment || null}
            />

            {!!errorMessage?.comment?.length && (
              <View style={[Gutters.smallVMargin]}>
                <Text style={[Fonts.errorText]}>{errorMessage?.comment}</Text>
              </View>
            )}
          </View>

          <View
            style={[Layout.column, Gutters.smallHPadding, Gutters.smallVMargin]}
          >
            <TouchableOpacity
              style={[Common.button.outlineRounded, Gutters.regularBMargin]}
              onPress={onClickSubmit}
            >
              <Text style={Fonts.textButton}>{'Submit'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <FeedbackAction
        modalRef={modalizeRef}
        OpenModal={OpenModal}
        CloseModal={CloseModal}
        onPress={onPressGotIt}
        icon={Images.flash}
        buttonStyle={Common.button.outlineRounded}
      ></FeedbackAction>
    </LinearGradient>
  )
}

export default FeedbackContainer