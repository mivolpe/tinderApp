import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-rn';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';


const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [name, setName] = useState(null);
    const [place, setPlace] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();


    useEffect(() => {
        getDataUrl();
    })


    const incompleteForm =!job || !age;

    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: name,
            job: job,
            age: age,
            place: place,
            longitude: longitude,
            latitude: latitude,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate("Home")
        })
        .catch(error => {
            alert(error.message);
        });
    };

    const getDataUrl = async() =>{
        const response = await fetch('https://api.ipify.org/?format=json');
        const json = await response.json();
        const access_key = "8df8693d3be27799699bb687eaba85aa";
        fetch("http://api.ipstack.com/"+json.ip + "?access_key="+access_key,{
            method: "GET",
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                console.log(responseJson);
                setPlace(responseJson.city);
                setLatitude(responseJson.latitude);
                setLongitude(responseJson.longitude)
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
                alert(JSON.stringify(error));
                console.error(error);
            });
    };

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
