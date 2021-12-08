import React, { useEffect, useState} from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import UploadImage from '../components/UploadImage'
import tw from 'tailwind-rn'
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../hooks/useAuth';
import {collection, doc, getDoc, getDocs, setDoc} from "@firebase/firestore";
import {db} from "../firebase";
import {useNavigation} from "@react-navigation/core";

const UploadImagesScreen = () => {
    useEffect(() => {
        (async() =>{
            await checkForCameraRollPermission()
            await checkImgUser()
        })();
      }, []);

    const { user } = useAuth();
    const [images, setImages] = useState(["","","","","","","","",""]);
    const navigation = useNavigation();


    const checkImgUser = async() =>{
        let index = 0;
        const array = []
        let imgRef = await getDocs(collection(db,"users",user.uid, "images"));
        imgRef.forEach((doc) => {
            array.push(doc.data().imageUrl)

            index++;
        })
        setImages(prev => [...array,...prev.slice(array.length)])
    }



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
        let number = 1;
        images.forEach(element => {
        if(!! element) {
            setDoc(doc(db, "users", user.uid, "images", "images"+number), {
                imageUrl : element
            })
            .catch(error => {
                alert(error.message);
            });
            number++;
        }
        if (!!element && number === 2) {
            setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                photoUrl: element,
            })
        }
        navigation.navigate("Modal")
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
