import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;



const TopStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
            <StatusBar  backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );
};

export default TopStatusBar;


const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    }
});
