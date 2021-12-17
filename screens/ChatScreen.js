import React from 'react'
import {IMLocalized} from '../config/i18n'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatList from '../components/ChatList'
import Header from '../components/Header'

const ChatSCreen = () => {
    return (
        <SafeAreaView>
            <Header title={IMLocalized('chat_title')}/>
            <ChatList></ChatList>
        </SafeAreaView>
    )
}

export default ChatSCreen
