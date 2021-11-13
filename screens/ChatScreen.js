import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatList from '../components/ChatList'
import Header from '../components/Header'

const ChatSCreen = () => {
    return (
        <SafeAreaView>
            <Header title="Chat"/>
            <ChatList></ChatList>
        </SafeAreaView>
    )
}

export default ChatSCreen
