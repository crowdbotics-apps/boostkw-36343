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

const PrivacyContainer = ({ navigation }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()


  const onNavigateBack = () => {
    navigation.goBack()
  }

  const goToTerms = () => {
    navigate("Terms");
  }

  // console.log(errorMessage);

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

      <View style={[Layout.col, Gutters.smallHPadding, Gutters.regularBMargin]}>
          <Title 
            text={"Privacy Policy"}
            onPressBack={onNavigateBack}
            textStyle={Fonts.titleBoldTerms}
            terms={true}
          />
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.regularVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Also see: <Text style={{ fontWeight: "700"}} onPress={goToTerms}>Terms and Conditions</Text></Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in SnapNrack. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Consent</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Information we collect</Text>
            
      </View>
      
      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>How we use your information</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>We use the information we collect in various ways, including to:</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>● Provide, operate, and maintain our website</Text>
          <Text style={[Fonts.textTerms]}>● Improve, personalize, and expand our website</Text>
          <Text style={[Fonts.textTerms]}>● Understand and analyze how you use our website</Text>
          <Text style={[Fonts.textTerms]}>● Develop new products, services, features, and functionality</Text>
          <Text style={[Fonts.textTerms]}>● Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</Text>
          <Text style={[Fonts.textTerms]}>● Send you emails</Text> 
          <Text style={[Fonts.textTerms]}>● Find and prevent fraud</Text> 
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>{`CCPA Privacy Rights (Do Not Sell My Personal Information)`}</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Under the CCPA, among other rights, California consumers have the right to:</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Text>
          <Text style={[Fonts.textTerms]}>Request that a business delete any personal data about the consumer that a business has collected.</Text>
          <Text style={[Fonts.textTerms]}>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</Text>
          <Text style={[Fonts.textTerms]}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>GDPR Data Protection Rights</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Text>
          <Text style={[Fonts.textTerms]}>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Text>
          <Text style={[Fonts.textTerms]}>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Text>
          <Text style={[Fonts.textTerms]}>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Text>
          <Text style={[Fonts.textTerms]}>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Text>
          <Text style={[Fonts.textTerms]}>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Text>
          <Text style={[Fonts.textTerms]}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Log Files</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>SnapNrack follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Cookies and Web Beacons</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Like any other website, SnapNrack uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Google DoubleClick DART Cookie</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Advertising Partners Privacy Policies</Text>
            
      </View>


      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>You may consult this list to find the Privacy Policy for each of the advertising partners of SnapNrack</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on SnapNrack, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Note that SnapNrack has no access to or control over these cookies that are used by third-party advertisers.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Third Party Privacy Policies</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>SnapNrack's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Children's Information</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. SnapNrack does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Text>
            
      </View>


      </LinearGradient>
    </ScrollView>
  )
}

export default PrivacyContainer
