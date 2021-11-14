import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from 'react-native-deck-swiper';
import { collection, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from '@firebase/firestore';
import { db } from '../firebase';
import generateId from '../lib/generateId';


const HomeScreen = () => {
    const navigation = useNavigation();
    const { user,logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);

   useLayoutEffect(() => {
        onSnapshot(doc(db, "users", user.uid), snapshot => {
            if (!snapshot.exists()){
                navigation.navigate("Modal");
            }
        });
   }, []);

   useEffect(() => {
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


        unsub = onSnapshot(query(collection(db,"users"),where("id", "not-in", [...passedUserIds, ...swipedUserIds])), (snapshot) => {
            setProfiles(
                snapshot.docs.filter((doc) => doc.id !== user.uid).map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });
    };

    fetchCards();
    return unsub;
    }, [db]);

    const swipeLeft = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id),userSwiped);
    };

    const swipeRight = async(cardIndex) =>{
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await(await getDoc(doc(db, "users", user.uid))).data();

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

                navigation.navigate("Match", {
                    loggedInProfile,
                    userSwiped,
                });


            } else {
                setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id),userSwiped);
            }
        });
    };

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
                            source={{ uri: user.photoURL }}
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
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "LIKE",
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
                                source={{ uri: card.photoURL }}
                            />
                            <View style={tw("absolute bottom-0 flex-row justify-between bg-transparent h-20 px-5")}>
                                <View>
                                    <Text style={tw("text-xl font-bold text-white")}>
                                        {card.displayName}
                                    </Text>
                                    <Text> job </Text>
                                    <Text> 
                                        <Ionicons 
                                            name='location'
                                            size={16} 
                                        />
                                        distance 
                                    </Text>
                                </View>
                                <Text style={tw("text-xl px-3 text-white")}>
                                     23
                                </Text>
                            </View>

                        </View>
                    ) : (
                        <View
                            style={tw("relative bg-white h-5/6 rounded-xl justify-center items-center")}
                        >
                            <Text
                                style={tw("font-bold pb-5")}
                            >
                                No more profiles
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
