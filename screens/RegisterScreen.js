import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react'
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {IMLocalized} from "../config/i18n";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email(IMLocalized('error_email'))
        .required(IMLocalized('error_email_required')),
    password: Yup.string()
        .min(6, IMLocalized('error_password_short'))
        .max(30, IMLocalized('error_password_long'))
        .required(IMLocalized('error_password_required')),
});

const RegisterScreen = () => {

    const {registerWithEmailPassword, loginWithEmailPassword} = useAuth();
    const [type, setType] = useState(null);
    const navigation = useNavigation();

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit=
                {values => {
                    if (type === "register") {
                        registerWithEmailPassword(values.email, values.password)
                    } else {
                        loginWithEmailPassword(values.email, values.password)
                    }
                }}
        >
            {(props) => (
                <ScrollView style={tw("flex-1")}>
                    <View style={tw("flex-1 items-center pt-1")}>
                        <Image
                            style={tw("h-32 w-full mb-24")}
                            resizeMode="contain"
                            source={{uri: "https://links.papareact.com/2pf"}}
                        />
                        <KeyboardAvoidingView>
                            <TextInput
                                keyboardType="email-address"
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                style={tw("text-left border-b-2 text-xl pb-2 w-64 mb-1")}
                                placeholder={IMLocalized('placeholder_email')}
                            />
                            {props.errors.email && props.touched.email ? (
                                <Text style={tw("text-red-600 font-bold ")}>
                                    {props.errors.email}
                                </Text>
                            ) : null}
                            <TextInput
                                value={props.values.password}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                secureTextEntry={true}
                                style={tw("text-left border-b-2 text-xl pb-2 w-64 mt-8")}
                                placeholder={IMLocalized('placeholder_password')}
                            />
                            {props.errors.password && props.touched.password ? (
                                <Text style={tw("text-red-600 font-bold")}>
                                    {props.errors.password}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                style={tw("w-64 p-3 rounded-xl bottom-0 mt-8 mb-5 bg-red-400")}
                                onPress={() => {
                                    props.handleSubmit()
                                    setType("login")
                                }}
                            >
                                <Text style={tw("text-center text-white text-xl")}>{IMLocalized('btn_login')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw("w-64 p-3 rounded-xl bottom-0 bg-white")}
                                onPress={() => {
                                    props.handleSubmit()
                                    setType("register")
                                }
                                }
                            >
                                <Text
                                    style={tw("text-center text-white text-xl text-red-400")}>
                                    {IMLocalized('btn_register')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw("mt-7")}
                                onPress={() => navigation.navigate("Forgot")}
                            >
                                <Text style={tw("text-center text-blue-400")}>
                                    {IMLocalized('forgot_password')}
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            )}
        </Formik>
    )
}

export default RegisterScreen
