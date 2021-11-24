import React from 'react'
import { StyleSheet,View, Text } from 'react-native'
import UploadImage from '../components/UploadImage'
import tw from 'tailwind-rn'
import { SafeAreaView } from 'react-native-safe-area-context'


const UploadImagesScreen = () => {
    return (
        <SafeAreaView style={tw("flex-1")}>
            <Text style={tw("text-center text-3xl font-bold")}>Upload Images</Text>
            <View style={styles.row}>
                <UploadImage/>
                <UploadImage/>
                <UploadImage/>
                <UploadImage/>
                <UploadImage/>
                <UploadImage/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        justifyContent: 'space-evenly'
    }



})

export default UploadImagesScreen
