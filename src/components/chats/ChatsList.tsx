import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
    Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Left, Right,
    Body, Icon, Text, Fab
} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import {CURRENT_CHAT_ACTIVITY, INDIGO} from "../../configuration/Constants";
import i18n from "i18next";

class ChatsList extends Component<any, any>{

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            active: true
        }
        this.onOpenChatClick = this.onOpenChatClick.bind(this);
    }

    onOpenChatClick() {
        this.props.navigation.navigate(CURRENT_CHAT_ACTIVITY);
    }

    render(): React.ReactNode {
        return (
            <View style={{
                height:"100%",
                padding:20,
                paddingTop:100
            }}>
                <Text style={{
                    fontSize: 18,
                    color: "gray",
                    textAlign: "center"
                }}>{i18n.t("chatsList:text.openChatPrompt")}</Text>

                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: INDIGO}}
                    position="bottomRight"
                    onPress={this.onOpenChatClick}
                >
                    <Icon type="MaterialCommunityIcons" name="chat" />
                </Fab>
            </View>
        );
    }
}

export default ChatsList;
