import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
});

const RegisterScreen = () => {

    const navigation = useNavigation();
    const { registerWithEmailPassword, loginWithEmailPassword } = useAuth(); 
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const registerUser = (() => {
        registerWithEmailPassword(email, password);
    })

    const loginUser = (() => {
        loginWithEmailPassword(email,password);
    })



    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={values => loginWithEmailPassword(values.email,values.password)}
        >
            {( props ) => (
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
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-1")}
                                placeholder="Enter Your Email"
                            />
                            {props.errors.email && props.touched.email ? (
                            <Text style={tw("text-red-600 font-bold ")}>
                                {props.errors.email}
                            </Text>
                            ): null }
                            <TextInput
                                value={props.values.password}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                secureTextEntry={true}
                                style={tw("text-left border-b-2 text-xl pb-2 w-64 mt-8")}
                                placeholder="Enter Your Password"
                            />
                            {props.errors.password && props.touched.password ? (
                                <Text style={tw("text-red-600 font-bold")}>
                                    {props.errors.password}
                                </Text>
                            ): null }
                            <TouchableOpacity
                                style={tw("w-64 p-3 rounded-xl bottom-0 mt-8 mb-5 bg-red-400")}
                                onPress= {props.handleSubmit}
                            >
                                <Text style={tw("text-center text-white text-xl")}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw("w-64 p-3 rounded-xl bottom-0 bg-white")}
                                onPress= {props.handleSubmit}
                            >
                                <Text
                                    style={tw("text-center text-white text-xl text-red-400")}>
                                Register</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            )}
        </Formik>
    )
}

export default RegisterScreen
