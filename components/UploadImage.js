import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import tw from 'tailwind-rn';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {

    const [image, setImage] = useState(null)
    const addImage = async () => {
        let _image =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            MediaTypeOptions: "image",
          });

          console.log(JSON.stringify(_image));

          if (!_image.cancelled) {
            setImage(_image.uri);
          }
    };

    return (  
        <TouchableOpacity
            onPress={addImage}
            style={[tw("bg-gray-300 m-1 "), {width:100, height:100}]}
            >
            {
            image  && <Image source={{ uri: image }} style={tw("h-32 w-24")} />
            }
            <AntDesign 
                style={tw("items-center")} 
                name="plus" 
                size={90} 
                color="gray"
            />
            <View style={tw("absolute bottom-0 items-center m-1")}>
                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
            </View>
        </TouchableOpacity>
        
    )
}
