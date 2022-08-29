import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from '@/Hooks'
import FastImage from "react-native-fast-image"

const Title = ({ text, onPressBack }) => {
    const { Fonts, Layout, Images } = useTheme()

  return (
    <View
        style={[
        Layout.row,
        Layout.justifyContentStart,
        Layout.alignItemsCenter
        ]}
    >
        <TouchableOpacity
                onPress={onPressBack} 
            >
                <FastImage
                    style={[{width: 12, height: 19}]}
                    source={Images.leftArrow}
                />
        </TouchableOpacity>
        <View style={[{paddingLeft: 20}]}>
          <Text style={[Fonts.titleBold]}>
                  {text || ""}
          </Text>
        </View>

    </View>
    );
}


export default Title;