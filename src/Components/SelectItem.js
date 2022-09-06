import React from "react"
import {
    View
  } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { useTheme } from '@/Hooks'
import FastImage from "react-native-fast-image"
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectItem = ({data, onSelect, defaultText="Select Item", buttonTextAfterSelection, rowTextForSelection}) => {
    const { Common, Layout, Gutters, Colors, Fonts, Images } = useTheme()

    return (
      <View style={[Layout.row, Gutters.smallVPadding]}>
        <SelectDropdown
            data={data}
            defaultButtonText={defaultText}
            onSelect={onSelect}
            buttonTextAfterSelection={buttonTextAfterSelection}
            rowTextForSelection={rowTextForSelection}
            dropdownIconPosition="right"
            renderDropdownIcon={(isOpened) => {
                return <FastImage 
                    style={[{width: 16, height: 7, marginRight: 4 }]}
                    source={Images.arrowDown}
                />
                }
            }
            buttonStyle={{...Common.selectInput, flex: 1, height: 40,  paddingHorizontal: 0}}
            buttonTextStyle={{...Common.selectInput, marginHorizontal: 0, marginRight: 8, borderBottomWidth: 0}}
            dropdownBackgroundColor={Colors.transparent}
            dropdownStyle={
                {
                    backgroundColor: "#010A60"
                }
            }
            rowStyle={{
                borderBottomWidth: 0,
            }}

            rowTextStyle={{
                ...Common.selectInputCard,
            }}

            selectedRowStyle={
                {
                    ...Common.selectInputCard,
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                }
            }

            selectedRowTextStyle={{
                ...Common.selectInputCard,
                fontWeight: "600",
            }}
        />
    </View>
    )
}


export default SelectItem