import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>I am the Homescreen</Text>
            <Button title="Go to Chat Screen"
             onPress={() => navigation.navigate('Chat')} />
        </View>
    )
}

export default HomeScreen
