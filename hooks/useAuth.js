import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from "expo-google-app-auth";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut
} from '@firebase/auth';
import { auth } from '../firebase';
import {IMLocalized} from "../config/i18n";

const AuthContext = createContext({});

const config = {
    androidClientId: '472157649847-a5bldpsgsp37kptvq459l31dastlgtfo.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);


    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }

                setLoadingInitial(false)
            }),
        []
    );

    const logout = async () => {
        setLoading(true);
        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    const signInWithGoogle = async () =>{
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === "success"){
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    };

    const registerWithEmailPassword = async(email, password) => {
        try{
            await createUserWithEmailAndPassword(auth,email, password)
        } catch (e) {
            console.log(e);
            alert(IMLocalized('email_used'))

        }
    }

    const loginWithEmailPassword = async(email, password) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            alert(IMLocalized('email_password_error'))
            console.log(e);
        }
    }

    const passwordReset = async(email) =>{
        try{
            await sendPasswordResetEmail(auth, email);
        } catch(e){
            alert(IMLocalized('email_password_error'))
        }
    }


    const memoedValue = useMemo(() => ({
        user,
        loading,
        error, 
        signInWithGoogle,
        registerWithEmailPassword,
        loginWithEmailPassword,
        passwordReset,
        logout, 
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}

