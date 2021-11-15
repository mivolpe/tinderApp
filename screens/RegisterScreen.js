import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import tw from 'tailwind-rn'

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    return (
        <ScrollView style={tw("flex-1 bg-red-400")}>

            <View style={tw("flex-1 items-center pt-1")}>
                <Image
                    style={tw("h-32 w-full")}
                    resizeMode="contain"
                    source={{ uri: "https://links.papareact.com/2pf" }}
                />
                <KeyboardAvoidingView
                behavior="padding">
                <TextInput
                    value={image}
                    onChangeText={setImage}
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Enter Your Name"
                />
                <TextInput
                    value={image}
                    onChangeText={setImage}
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Enter Your Email"
                />
                <TextInput
                    value={image}
                    onChangeText={setImage}
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Enter Your Password"
                />
                                <TextInput
                    value={image}
                    onChangeText={setImage}
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Confirm your Password"
                />
                <TextInput
                    value={image}
                    onChangeText={setImage}
                    keyboardType='numeric'
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Enter Your Age"
                />
                <TextInput
                    value={image}
                    onChangeText={setImage}
                    style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-8")}
                    placeholder="Enter your Job"
                />
                <TouchableOpacity 
                    disabled={incompleteForm}
                    style={[
                        tw("w-64 p-3 rounded-xl bottom-0"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}
                >
                    <Text style={tw("text-center text-white text-xl")}>Register</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen
