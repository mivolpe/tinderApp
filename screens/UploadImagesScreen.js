import React, { useEffect, useState} from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import UploadImage from '../components/UploadImage'
import tw from 'tailwind-rn'
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../hooks/useAuth';
import { storage } from '../firebase';



const UploadImagesScreen = () => {
    useEffect(() => {
        checkForCameraRollPermission()
      }, []);

    const { user } = useAuth();
    const [images, setImages] = useState(Array.from({length: 9}, (_) => ''));


    const  checkForCameraRollPermission=async()=>{
        const statusGallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!statusGallery.granted) {
          alert("Please grant gallery permissions inside your system's settings");
        }
        const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
        if (!statusCamera.granted) {
            alert("Please grant camera roll permissions inside your system's settings");
        }
    }

    const setImage = (image, index) => {
      const newImages = [...images];
      newImages[index] = image;
      setImages(newImages);
  }

  const uploadImage = async() => {
    console.log(images)
    images.forEach(element => {
      if (element != ""){
        const uploadUri = element;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1)
        try{
          const imgref = ref(storage, filename)
        } catch(e) {
          console.log(e)
        }
      }

    });

  }
    return (
        <View style={tw("flex-1 items-center pt-5")}>
          <Text style={tw("text-center text-3xl font-bold p-5")}>Upload Images</Text>
          <View style={tw("flex-row flex-wrap justify-evenly")}>
            {images.map((_, index) => <UploadImage setImage={setImage} index={index} image={images[index]} key={index}/>)}
          </View>
          <TouchableOpacity
            style={tw("w-64 p-3 rounded-xl absolute bottom-10 bg-red-400")}
            onPress={uploadImage}
            >
            <Text style={tw("text-center text-white text-xl")}>Save</Text>
          </TouchableOpacity>
        </View>
    )
}

export default UploadImagesScreen
