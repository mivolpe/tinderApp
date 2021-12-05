import React, { createRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import tw from 'tailwind-rn';
import { AntDesign, Fontisto} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actions-sheet';

export default function UploadImage({image, setImage, index}) {

    let actionSheet;

    const actionSheetRef = createRef();

    const addImageLib = async () => {
        let _image =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            MediaTypeOptions: "image",
        });

        if (!_image.cancelled) {
            setImage(_image.uri,index);
        }
    };

    const addImageCam = async () => {
        let _image =  await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            MediaTypeOptions: "image",
        });

        if (!_image.cancelled) {
            setImage(_image.uri,index);
        }
        
    };

    const Cancel = async() => {
        actionSheetRef.current?.setModalVisible()
    }

    return (
        <View>
            <TouchableOpacity
                onPress={ () => { actionSheetRef.current?.setModalVisible()}}
                style={[tw("bg-gray-300 m-1 "), {width:100, height:120}]}
            >
                {
                image !==''  && <Image source={{ uri: image }} style={{width:100, height:120}} />
                }
                {image ? <></> : <AntDesign
                    style={tw("items-center m-1")} 
                    name="plus" 
                    size={90} 
                    color="gray"
                />
                }
                <View style={tw("absolute bottom-0 items-center m-1")}>
                    <Text style={tw("font-bold")}>{image ? '' : 'Upload Image'}</Text>
                </View>
            </TouchableOpacity>
            <ActionSheet 
                ref={actionSheetRef} 
                gestureEnabled={true} 
                containerStyle={tw("items-center")}
            >
                <View>
                    <TouchableOpacity onPress={addImageLib} style={tw("flex-row items-center")}>
                        <Text style={tw("text-lg py-4 border-b-2")}>
                            Open Gallery
                        </Text>
                        <Fontisto name="picture" size={20} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={addImageCam} style={tw("flex-row items-center")}>
                        <Text style={tw("text-lg py-4 border-b-2")}>
                            Open Camera  
                        </Text>
                        <AntDesign name="camera" size={20} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={Cancel}>
                        <Text style={tw("text-xl text-red-500 py-4 text-center font-bold")}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
        </View>
        
    )
}
