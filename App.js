import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect} from 'react';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import * as Notifications from "expo-notifications";
import {LogBox} from "react-native";
import {init} from './config/i18n'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});



export default function App() {
    useEffect(() => {
        init();
        LogBox.ignoreLogs(['Setting a timer']);
        LogBox.ignoreLogs(['AsyncStorage has been extracted from ']);
    },[])

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}