import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react'
import { View, Text, Button, ImageBackground, TouchableOpacity, Image } from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn';

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={tw("flex-1")}>
            <ImageBackground 
                resizeMode="cover"
                style={tw("flex-1")}
                source= {{ uri: "https://tinder.com/static/tinder.png" }}
            >
                <Image
                    style={tw("h-32 w-full")}
                    resizeMode="contain"
                    source={{ uri: "https://links.papareact.com/2pf" }}
                />
                <TouchableOpacity 
                    style={[
                        tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
                        {marginHorizontal: "25%"},
                    ]}
                >
                    <Text 
                        style={tw("font-semibold text-center")}
                        onPress={signInWithGoogle}
                    > 
                        Login with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        tw("absolute bottom-20 w-52 bg-white p-4 rounded-2xl"),
                        {marginHorizontal: "25%"},
                    ]}
                >
                    <Text 
                        style={tw("font-semibold text-center")}
                        onPress={() => navigation.navigate("UploadImages")}
                    > 
                        Login with Email
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen
