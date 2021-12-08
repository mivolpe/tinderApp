import {doc, getDoc, serverTimestamp, setDoc} from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-rn';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getPosUser from "../services/GetPosUser";


const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [job, setJob] = useState();
    const [age, setAge] = useState();
    const [name, setName] = useState();
    const [place, setPlace] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [profilePicture, setProfilePicture] = useState()


    useEffect(() => {
        (async() => {
            await getDataUrl()
            await UserprofileInfo()
        })();
    },[])


    const incompleteForm = !name || !job || !age;

    const UserprofileInfo = async() => {
        const userRef = doc(db,"users",user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()){
            const {displayName,age,job,photoUrl} = userSnap.data();
            setProfilePicture(photoUrl)
            setName(displayName)
            setAge(age)
            setJob(job)
        }
    }

    const updateUserProfile = async () => {
        const userRef = doc(db,"users",user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()){
            const {photoUrl} = userSnap.data();
            setProfilePicture(photoUrl)

        }
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: name,
            job: job,
            age: age,
            photoUrl : profilePicture,
            place: place,
            lon: longitude,
            lat: latitude,
        }).then(() => {
            navigation.navigate("Home")
        })
        .catch(error => {
            alert(error.message);
        });
    };

     const getDataUrl = async() =>{
         const {city, lat, lon} = await getPosUser.getDataUrl();
         setPlace(city);
         setLatitude(lat);
         setLongitude(lon);
     }


    return (
        <ScrollView contentContainerStyle={tw("flex-1")}>
            <View style={tw("flex-1 items-center pt-1")}>
                <Image
                    style={tw("h-20 w-full")}
                    resizeMode="contain"
                    source={{ uri: "https://links.papareact.com/2pf" }}
                />

                <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                    Update your profile
                </Text>

                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: The Pics
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("UploadImages")}
                >
                    <Text style={tw("font-bold bg-red-400 text-white p-4 border-2 text-xl rounded-lg")}>
                        upload Images
                    </Text>
                </TouchableOpacity>
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 2: The name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter your name"
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 3: The Job
                </Text>
                <TextInput
                    value={job}
                    onChangeText={setJob}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter your occupation"
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 4: The Age
                </Text>
                <TextInput
                    value={age}
                    onChangeText={setAge}
                    style={tw("text-center text-xl pb-2 mb-10")}
                    placeholder="Enter your age"
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TouchableOpacity 
                    disabled={incompleteForm}
                    style={[
                        tw("w-64 p-3 rounded-xl"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}
                    onPress={updateUserProfile}
                >
                    <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ModalScreen
