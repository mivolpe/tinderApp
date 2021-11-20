import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';

const RegisterScreen = () => {

    const navigation = useNavigation();
    const { registerWithEmailPassword } = useAuth(); 
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const incompleteForm = !name || !password || !email || !job || !age ;

    const registerUser = (() => {
        registerWithEmailPassword(email, password);
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: name,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate("Home")
        })
        .catch(error => {
            alert(error.message);
        });
    })

    return (
        <ScrollView style={tw("flex-1")}>

            <View style={tw("flex-1 items-center pt-1")}>
                <Image
                    style={tw("h-32 w-full")}
                    resizeMode="contain"
                    source={{ uri: "https://links.papareact.com/2pf" }}
                />
                <KeyboardAvoidingView>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Enter Your Name"
                    />
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
                    <TextInput

                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Confirm your Password"
                    />
                    <TextInput
                        value={age}
                        onChangeText={setAge}
                        keyboardType='numeric'
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Enter Your Age"
                    />
                    <TextInput
                        value={job}
                        onChangeText={setJob}
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                        placeholder="Enter your Job"
                    />
                    <TouchableOpacity 
                        disabled={incompleteForm}
                        style={[
                            tw("w-64 p-3 rounded-xl bottom-0"),
                            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                        ]}
                        onPress= {registerUser}
                    >
                        <Text style={tw("text-center text-white text-xl")}>Register</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen
