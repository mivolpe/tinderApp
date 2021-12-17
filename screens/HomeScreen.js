import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text,TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from 'react-native-deck-swiper';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from '@firebase/firestore';
import { db } from '../firebase';
import generateId from '../lib/generateId';
import requestUser from '../services/RequestUser'
import {useIsFocused} from "@react-navigation/native";
import useNotification from "../hooks/useNotification";
import RequestExpoAPI from "../services/RequestExpoAPI";
import {IMLocalized} from '../config/i18n'


const HomeScreen = () => {
    const navigation = useNavigation();
    const { user,logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [image, setImage] = useState()
    const {expoPushToken} = useNotification()

    const swipeRef = useRef(null);

    const isFocused = useIsFocused()

   useLayoutEffect(() => {
        onSnapshot(doc(db, "users", user.uid), snapshot => {
            if (!snapshot.exists()){
                navigation.navigate("Modal");
            }
        });
   }, []);

    useEffect(() => {
        if(expoPushToken)
        {
            (async() => {
                await setDoc(doc(db, "user_mobile", user.uid),{
                    token: expoPushToken
                })
            })()
        }
    },[expoPushToken])

   useEffect(() => {
       if(isFocused) {

           let unsub;

           const fetchCards = async () => {

               const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(
                   (snapshot) => snapshot.docs.map((doc) => doc.id)
               );

               const swipes = await getDocs(collection(db, "users", user.uid, "swipes")).then(
                   (snapshot) => snapshot.docs.map((doc) => doc.id)
               );

               const passedUserIds = passes.length > 0 ? passes : ["test"];
               const swipedUserIds = swipes.length > 0 ? swipes : ["test"];


               unsub = onSnapshot(query(collection(db, "users")), (snapshot) => {
                   setProfiles(
                       snapshot.docs.filter((doc) => doc.id !== user.uid).map((doc) => ({
                           id: doc.id,
                           ...doc.data(),
                       }))
                   );
               });
           };

           fetchCards().then((async () => {
               await getUserinfo()
           })());
           return unsub;
       }
    }, [db,isFocused]);

    const swipeLeft = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        await setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };

    const swipeRight = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await(await getDoc(doc(db, "users", user.uid))).data();
        const deviceUserSwiped = await(await getDoc(doc(db,"user_mobile",userSwiped.id))).data();
        console.log(deviceUserSwiped.token)
        await RequestExpoAPI.sendAPILike(deviceUserSwiped.token);

        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then((DocumentSnapshot) => {
            if (DocumentSnapshot.exists()) {

                setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped)

                setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                    user: {
                        [user.uid]: loggedInProfile,
                        [userSwiped.id]: userSwiped
                    },
                    userMatched: [user.uid, userSwiped.id],
                    timestamp: serverTimestamp(),
                });
                RequestExpoAPI.sendAPIMatch(deviceUserSwiped.token);
                navigation.navigate("Match", {
                    loggedInProfile,
                    userSwiped,
                });


            } else {
                setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id),userSwiped);
            }
        });
    };

    const getUserinfo = async() =>{
        const userRef = doc(db,"users",user.uid);
        const userImgRef = doc(db,"users",user.uid,"images","images1");
        const userSnap = await getDoc(userRef);
        const userImgSnap = await getDoc(userImgRef);
        if (userSnap.exists()){
            const {lat,lon} = userSnap.data();
            setLatitude(lat);
            setLongitude(lon);
        }
        if (userImgSnap.exists()){
            const {imageUrl} = userImgSnap.data();
            setImage(imageUrl)
        }
    }

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(0);
    };
    const deg2rad = (angle) => {
        return angle * (Math.PI / 180);
    };

    const createUser = async() =>{
        await requestUser.getUser()
    }

    return (
        <SafeAreaView
            style={tw("flex-1")}
        >
            {/* Header */}
                <View
                    style={tw("flex-row items-center justify-between px-5")}
                >
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Modal")}
                    >
                        <Image
                            style={tw("h-10 w-10 rounded-full")}
                            source={{ uri: image }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={logout}
                    >
                        <Image
                            style={tw("h-14 w-14")}
                            source={require("../logo.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Chat")}
                    >
                        <Ionicons
                            name='chatbubbles'
                            size={30}
                            color="#FF5864"
                        />
                    </TouchableOpacity>
                </View>
            {/* End of Header */}

            {/* Cards */}

            <View
                style={tw("flex-1 -mt-6")}
            >
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent"}}
                    cards={profiles}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => {
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        swipeRight(cardIndex);
                    }}
                    overlayLabels={{
                        left: {
                            title: IMLocalized('no'),
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: IMLocalized('like'),
                            style: {
                                label: {
                                    color: "green",
                                    textAlign: "left",
                                },
                            },
                        },
                    }}
                    renderCard={(card) => card ? (
                        <View
                            style={tw("bg-red-500 h-5/6 rounded-xl")}
                        >
                            <Image
                                style={tw("absolute top-0 h-full w-full rounded-xl")}
                                source={{ uri: card.photoUrl }}
                            />
                            <View style={tw("absolute bottom-10 flex-row justify-between bg-transparent h-20 px-5")}>
                                <View>
                                    <Text style={tw("text-xl font-bold text-white")}>
                                        {card.displayName}
                                    </Text>
                                    <Text style={tw("text-xl text-white")}>
                                        {card.age}
                                    </Text>
                                    <Text> {card.job} </Text>
                                    <Text style={tw("text-lg font-black text-white")}>
                                        <Ionicons
                                            name='location'
                                            size={16}
                                        />
                                        {card.place} {getDistance(latitude,longitude,card.lat,card.lon)} km
                                    </Text>
                                </View>

                            </View>

                        </View>
                    ) : (
                        <View
                            style={tw("relative bg-white h-5/6 rounded-xl justify-center items-center")}
                        >
                            <Text
                                style={tw("font-bold pb-5")}
                            >
                                {IMLocalized('no_profile')}
                            </Text>
                            <Image
                                style={tw("h-20 w-20")}
                                height={100}
                                width={100}
                                source={{ uri: "https://links.papareact.com/6gb" }}
                            />
                        </View>
                    )}
                />
            </View>
            <View style={tw("flex flex-row justify-evenly bottom-4")}>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}
                >
                    <Entypo name="cross"  size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}
                >
                    <AntDesign name="heart" size={30} color="green" />
                </TouchableOpacity>
            </View>
            {/* End of Cards */}
        </SafeAreaView>
    );
}

export default HomeScreen
