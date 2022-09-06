import React,  { useState }  from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Title } from '@/Components'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'
import { checkEmail } from '@/Utils/Validations'

const TermsContainer = ({ navigation }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const onNavigateBack = () => {
    navigation.goBack()
  }

  const goToPrivacy = () => {
    navigate('Privacy')
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
            text={"Terms and Conditions"}
            onPressBack={onNavigateBack}
            textStyle={Fonts.titleBoldTerms}
            terms={true}
          />
      </View>

      {/* <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.regularVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Also see: <Text style={{ fontWeight: "700"}} onPress={goToPrivacy}>Privacy Policy</Text></Text>
            
      </View> */}

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.regularVMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Last updated: August 15, 2022</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Please read these terms and conditions carefully before using Our Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Interpretation</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Definitions</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>For the purposes of these Terms and Conditions:</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Application means the software program provided by the Company downloaded by You on any electronic device, named tracknapp</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Application Store means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Account means a unique account created for You to access our Service or parts of our Service.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Country refers to: California, United States</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Mainstream Energy Corporation dba SnapNrack, 225 Bush Street, Suite 1400, San Francisco, CA 94101.`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Content refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Feedback means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Free Trial refers to a limited period of time that may be free when purchasing a Subscription.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Promotions refer to contests, sweepstakes or other promotions offered through the Service.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Service refers to the Application or the Website or both.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* Subscriptions refer to the services or access to the Service offered on a subscription basis by the Company to You.</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>{`* Website refers to SnapNrack, accessible from <https://snapnrack.com/>`}</Text>
          <Text style={[Fonts.textTerms, Gutters.smallBMargin]}>* You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text>
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Acknowledgment</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Subscriptions</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 12 }]}>Subscription period</Text>
            
      </View>


      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The Service or some parts of the Service are available only with a paid Subscription. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of Subscription plan you select when purchasing the Subscription.</Text>

          <Text style={[Fonts.textTerms]}>At the end of each period, Your Subscription will automatically renew under the exact same conditions unless You cancel it or the Company cancels it.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 12 }]}>Subscription cancellations</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>You may cancel Your Subscription renewal either through Your Account settings page or by contacting the Company. You will not receive a refund for the fees You already paid for Your current Subscription period and You will be able to access the Service until the end of Your current Subscription period.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Billing</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>You shall provide the Company with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. Should automatic billing fail to occur for any reason, the Company will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Fee Changes</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The Company, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Subscription period.</Text>
          <Text style={[Fonts.textTerms]}>The Company will provide You with reasonable prior notice of any change in Subscription fees to give You an opportunity to terminate Your Subscription before such change becomes effective.</Text>
          <Text style={[Fonts.textTerms]}>Your continued use of the Service after the Subscription fee change comes into effect constitutes Your agreement to pay the modified Subscription fee amount.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Refunds</Text>
            
      </View>

      <View
            style={[
            Layout.col,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Except when required by law, paid Subscription fees are non-refundable.</Text>
          <Text style={[Fonts.textTerms]}>Certain refund requests for Subscriptions may be considered by the Company on a case-by-case basis and granted at the sole discretion of the Company.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Free Trial</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>The Company may, at its sole discretion, offer a Subscription with a Free Trial for a limited period of time. You may be required to enter Your billing information in order to sign up for the Free Trial.

            If You do enter Your billing information when signing up for a Free Trial, You
            will not be charged by the Company until the Free Trial has expired. On the
            last day of the Free Trial period, unless You cancelled Your Subscription, You
            will be automatically charged the applicable Subscription fees for the type of
            Subscription You have selected.

            At any time and without notice, the Company reserves the right to (i) modify
            the terms and conditions of the Free Trial offer, or (ii) cancel such Free
            Trial offer.
            </Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Promotions</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Any Promotions made available through the Service may be governed by rules
            that are separate from these Terms.

            If You participate in any Promotions, please review the applicable rules as
            well as our Privacy policy. If the rules for a Promotion conflict with these
            Terms, the Promotion rules will apply.
            </Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>User Accounts</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>When You create an account with Us, You must provide Us information that is
            accurate, complete, and current at all times. Failure to do so constitutes a
            breach of the Terms, which may result in immediate termination of Your account
            on Our Service.

            You are responsible for safeguarding the password that You use to access the
            Service and for any activities or actions under Your password, whether Your
            password is with Our Service or a Third-Party Social Media Service.

            You agree not to disclose Your password to any third party. You must notify Us
            immediately upon becoming aware of any breach of security or unauthorized use
            of Your account.

            You may not use as a username the name of another person or entity or that is
            not lawfully available for use, a name or trademark that is subject to any
            rights of another person or entity other than You without appropriate
            authorization, or a name that is otherwise offensive, vulgar or obscene.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 14 }]}>Content</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallTMargin
            ]}
        >
          <Text style={[Fonts.textTerms, { fontWeight: '600', fontSize: 12 }]}>Your Right to Post Content</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}>Our Service allows You to post Content. You are responsible for the Content
                that You post to the Service, including its legality, reliability, and
                appropriateness.

                By posting Content to the Service, You grant Us the right and license to use,
                modify, publicly perform, publicly display, reproduce, and distribute such
                Content on and through the Service. You retain any and all of Your rights to
                any Content You submit, post or display on or through the Service and You are
                responsible for protecting those rights. You agree that this license includes
                the right for Us to make Your Content available to other users of the Service,
                who may also use Your Content subject to these Terms.

                You represent and warrant that: (i) the Content is Yours (You own it) or You
                have the right to use it and grant Us the rights and license as provided in
                these Terms, and (ii) the posting of Your Content on or through the Service
                does not violate the privacy rights, publicity rights, copyrights, contract
                rights or any other rights of any person.</Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}></Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}></Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}></Text>
            
      </View>

      <View
            style={[
            Layout.row,
            Gutters.smallHPadding,
            Gutters.smallVMargin
            ]}
        >
          <Text style={[Fonts.textTerms]}></Text>
            
      </View>

      

      </LinearGradient>
    </ScrollView>
  )
}

export default TermsContainer
