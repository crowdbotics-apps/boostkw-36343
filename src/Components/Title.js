import React from "react";
import { StyleSheet, View } from "react-native";

const Title = ({ text, onPressBack }) => {


  return (
    <View
        style={[
        Layout.row,
        Layout.scrollSpaceBetween,
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
        <Text style={[Fonts.titleBold, Fonts.textCenter]}>
                Sing Up
        </Text>
        <View/>
    </View>
    )
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default Title;