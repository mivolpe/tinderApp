// import React, { useEffect, useRef } from 'react'
// import { StyleSheet,View, Text } from 'react-native'
// import UploadImage from '../components/UploadImage'
// import tw from 'tailwind-rn'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import * as ImagePicker from 'expo-image-picker';
// import ActionSheetPhoto from '../components/ActionSheetPhoto'
// import ActionSheet from 'react-native-actions-sheet'
import React, { useRef } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn';
import ActionSheet from 'react-native-actions-sheet';



const UploadImagesScreen = () => {
//     useEffect(() => {
//         checkForCameraRollPermission()
//       }, []);

//     const  checkForCameraRollPermission=async()=>{
//         const statusGallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (!statusGallery.granted) {
//           alert("Please grant gallery permissions inside your system's settings");
//         }
//         const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
//         if (!statusGallery.granted) {
//             alert("Please grant camera roll permissions inside your system's settings");
//         }
//     }

//     return (
//         <SafeAreaView style={tw("flex-1")}>
//             <Text style={tw("text-center text-3xl font-bold")}>Upload Images</Text>
//             <View style={styles.row}>
//                 <UploadImage/>
//                 <UploadImage/>
//                 <UploadImage/>
//                 <UploadImage/>
//                 <UploadImage/>
//                 <UploadImage/>
//             </View>
//         </SafeAreaView>
//     )
// }
let actionSheet = useRef();
let optionArray = ['Option1', 'Option2','Option3','Option4', 'Cancel'];

const showActionSheet = () =>{
    actionSheet.current.show();
}

return (
    <SafeAreaView style={tw("flex-1 justify-center content-center text-center pt-32 p-16")}>
        <Text style={tw("text-center text-lg text-white mt-10")}>
            React native bottom action sheet
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

// const styles = StyleSheet.create({

//     row: {
//         flex: 1,
//         flexDirection: "row",
//         flexWrap: "wrap",
//         padding: 10,
//         justifyContent: 'space-evenly'
//     }
// })

export default UploadImagesScreen
