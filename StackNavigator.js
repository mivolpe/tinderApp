import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import useAuth from './hooks/useAuth';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MatchScreen from './screens/MatchScreen';
import MessageScreen from './screens/MessageScreen';
import ModalScreen from './screens/ModalScreen';
import RegisterScreen from './screens/RegisterScreen';
import { LogBox } from 'react-native';
import UploadImagesScreen from './screens/UploadImagesScreen';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    LogBox.ignoreAllLogs();//Ignore all log notifications

    const { user }= useAuth();
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
             }}
        >
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Chat" component={ChatScreen}/>
                        <Stack.Screen name="Message" component={MessageScreen}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "modal" }}>
                        <Stack.Screen name="Modal" component={ModalScreen}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                        <Stack.Screen name="Match" component={MatchScreen}/>
                    </Stack.Group>

                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="UploadImages" component={UploadImagesScreen}/>
                </>
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator
