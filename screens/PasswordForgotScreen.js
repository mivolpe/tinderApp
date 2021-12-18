import React from 'react'
import {IMLocalized} from '../config/i18n'
import {Text, View, SafeAreaView,TextInput, TouchableOpacity} from "react-native";
import tw from "tailwind-rn";
import {Formik} from 'formik';
import * as Yup from 'yup';
import useAuth from "../hooks/useAuth";
import {useNavigation} from "@react-navigation/core";

const ForgotSchema = Yup.object().shape({
    email: Yup.string()
        .email(IMLocalized('error_email'))
        .required(IMLocalized('error_email_required')),
});

const PasswordForgotScreen = () => {

    const { passwordReset } = useAuth();
    const navigation = useNavigation();
    return (
        <Formik
            initialValues={{email: ''}}
            validationSchema={ForgotSchema}
            onSubmit=
                {values => {
                    passwordReset(values.email)
                    navigation.navigate("Register")
                }}
        >
            {(props) => (
                <SafeAreaView style={tw("flex-1")}>
                    <Text style={tw("text-xl mt-32 ml-8")}>
                        {IMLocalized('forgot_password')}
                    </Text>
                    <TextInput
                        keyboardType="email-address"
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email}
                        style={tw("text-left border-b-2 text-xl pb-2 w-64 ml-8 mt-4 mb-1")}
                        placeholder={IMLocalized('placeholder_email')}
                    />
                    {props.errors.email && props.touched.email ? (
                        <Text style={tw("text-red-600 font-bold ml-8 ")}>
                            {props.errors.email}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={tw("w-64 p-3 rounded-xl bottom-0 ml-8 mt-8 mb-5 bg-red-400")}
                        onPress={() => {
                            props.handleSubmit()
                        }}
                    >
                        <Text style={tw("text-center text-white text-xl")}>{IMLocalized('send_email')}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </Formik>
    )
}

export default PasswordForgotScreen