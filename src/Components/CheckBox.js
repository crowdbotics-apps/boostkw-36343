import React from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from '@react-native-community/checkbox';

const CheckBoxs = ({disabled, value, onValueChange}) => (
  <View style={[styles.horizontal]}>
    <CheckBox 
        boxType="square"
        disabled={disabled}
        value={value}
        onValueChange={onValueChange} 
        style ={ {width: 20, height: 20 } }   
    />
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default CheckBoxs;