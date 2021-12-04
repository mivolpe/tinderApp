import { doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import tw from 'tailwind-rn'
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const RegisterScreen = () => {

    const navigation = useNavigation();
    const { registerWithEmailPassword, loginWithEmailPassword } = useAuth(); 
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const incompleteForm =  !password || !email

    const registerUser = (() => {
        registerWithEmailPassword(email, password);
        // setDoc(doc(db, 'users', user.uid), {
        //     id: user.uid,
        //     displayName: name,
        //     job: job,
        //     age: age,
        //     timestamp: serverTimestamp(),
        // }).then(() => {
        //     navigation.navigate("UploadImages")
        // })
        // .catch(error => {
        //     alert(error.message);
        // });
    })

    const loginUser = (() => {
        loginWithEmailPassword(email,password);
    })



    return (
        <ScrollView style={tw("flex-1")}>

            <View style={tw("flex-1 items-center pt-1")}>
                <Image
                    style={tw("h-32 w-full mb-24")}
                    resizeMode="contain"
                    source={{ uri: "https://links.papareact.com/2pf" }}
                />
                <KeyboardAvoidingView>
                    <TextInput
                    keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Enter Your Email"
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Enter Your Password"
                    />
                    <TouchableOpacity 
                        disabled={incompleteForm}
                        style={[
                            tw("w-64 p-3 rounded-xl bottom-0 mb-5"),
                            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                        ]}
                        onPress= {loginUser}
                    >
                        <Text style={tw("text-center text-white text-xl")}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        disabled={incompleteForm}
                        style={[
                            tw("w-64 p-3 rounded-xl bottom-0"),
                            incompleteForm ? tw("bg-gray-400") : tw("bg-white"),
                        ]}
                        onPress= {registerUser}
                    >
                        <Text 
                            style={[
                                tw("text-center text-white text-xl"),
                                incompleteForm ? tw("text-white") : tw("text-red-400"),
                            ]}>
                        Register</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen
