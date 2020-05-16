import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
    Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Left, Right,
    Body, Icon, Text
} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";
import ChatsList from "./ChatsList";

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    });
}

const ChatsActivity = ({navigation}) => {

    const [loading, setLoading] = useState(true);

    if(loading) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setLoading(false)}
            onError={e => console.error(e)}
        />;
    }

    return (
        <Container>
            <Header style={{backgroundColor:"indigo"}} androidStatusBarColor={"indigo"}>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right />
            </Header>
            <Content contentContainerStyle={{flexGrow: 1}}>
                <ChatsList navigation={navigation}/>
            </Content>
        </Container>
    )
}

export default ChatsActivity;
