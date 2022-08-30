import React from "react"
import {
    StyleSheet,
    View,
    TouchableOpacity
  } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { useTheme } from '@/Hooks'

const SelectItem = ({data, onSelect, defaultText="Select Item"}) => {
    const { Common, Layout, Gutters, Colors, Fonts } = useTheme()

    return (
      <View style={[Layout.row, Gutters.smallVPadding]}>
        <SelectDropdown
            data={data}
            defaultButtonText={defaultText}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
            dropdownIconPosition="right"
            // renderDropdownIcon={}
            // buttonStyle={}
            // buttonTextStyle={}
            // dropdownStyle
            // dropdownBackgroundColor
            // rowStyle
            // rowTextStyle
            // selectedRowStyle
            // selectedRowTextStyle
        />
    </View>
    )
}


export default SelectItem