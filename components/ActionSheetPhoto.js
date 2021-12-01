import React, { useRef } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn';
import ActionSheet from 'react-native-actions-sheet';


const ActionSheetPhoto = () => {
    let actionSheet = useRef();
    let optionArray = ['Option1', 'Option2','Option3','Option4', 'Cancel'];

    const showActionSheet = () =>{
        actionSheet.current.show();
    }

    return (
        <SafeAreaView style={tw("flex-1 justify-center content-center text-center pt-30 bg-gray-300 p-16")}>
            <Text style={tw("text-center text-lg text-white mt-10")}>
                React native bootom action sheet
            </Text>
            <TouchableOpacity 
                style={tw("w-full h-40 p-10 bg-blue-200")}
                onPress={showActionSheet}
            >
                <Text>
                    Press It
                </Text>
            </TouchableOpacity>
            <Text>
                Lirs Tech Tips
            </Text>
            <ActionSheet
                ref={actionSheet}
                title={'Wich do you like?'}
                options={optionArray}
                cancelButtonIndex={4}
            />


        </SafeAreaView>
    )
}

export default ActionSheetPhoto
