import {doc, getDoc, serverTimestamp, setDoc} from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-rn';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getPosUser from "../services/GetPosUser";
import { Formik } from 'formik';
import * as Yup from 'yup';

const ModalSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    job: Yup.string()
        .min(6, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    age: Yup.number()
        .min(2, 'Too Short!')
        .required('Required'),

});


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

    const updateUserProfile = async (name, job, age) => {
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

     const initialValue = {
         name : name,
         job : job,
         age : age,
     }

    return (
        <Formik
            initialValues={ initialValue }
            enableReinitialize={true}
            validationSchema={ModalSchema}
            onSubmit={values => updateUserProfile(values.name,values.job,values.age)}
        >
            {( props ) => (
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
                            onChangeText={props.handleChange('name')}
                            onBlur={props.handleBlur('name')}
                            value={props.values.name}
                            style={tw("text-center text-xl pb-2")}
                            placeholder="Enter your name"
                        />
                        {props.errors.name && props.touched.name ? (
                            <Text style={tw("text-red-600 font-bold ")}>
                                {props.errors.name}
                            </Text>
                        ): null }
                        <Text style={tw("text-center p-4 font-bold text-red-400")}>
                            Step 3: The Job
                        </Text>
                        <TextInput
                            onChangeText={props.handleChange('job')}
                            onBlur={props.handleBlur('job')}
                            value={props.values.job}
                            style={tw("text-center text-xl pb-2")}
                            placeholder="Enter your occupation"
                        />
                        {props.errors.job && props.touched.job ? (
                            <Text style={tw("text-red-600 font-bold ")}>
                                {props.errors.job}
                            </Text>
                        ): null }
                        <Text style={tw("text-center p-4 font-bold text-red-400")}>
                            Step 4: The Age
                        </Text>
                        <TextInput
                            onChangeText={props.handleChange('age')}
                            onBlur={props.handleBlur('age')}
                            value={props.values.age}
                            style={tw("text-center text-xl ")}
                            placeholder="Enter your age"
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        {props.errors.age && props.touched.age ? (
                            <Text style={tw("text-red-600 font-bold ")}>
                                {props.errors.age}
                            </Text>
                        ): null }
                        <TouchableOpacity
                            style={tw("w-64 p-3 rounded-xl bg-red-400 mt-5")}
                            onPress={props.handleSubmit}
                        >
                            <Text style={tw("text-center text-white  text-xl")}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </Formik>
    )
}

export default ModalScreen
