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

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";
import {MAIN_CHATS_PAGE_TEXT} from "../../configuration/Constants";

class ChatsList extends Component<any, any>{

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            active: true
        }
        this.onOpenChatClick = this.onOpenChatClick.bind(this);
    }

    onOpenChatClick() {
        this.props.navigation.navigate("CurrentChat");
    }

    render(): React.ReactNode {
        return (
            <View style={{
                height:"100%",
                padding:20,
                paddingTop:"50%"
            }}>
                <Text style={{
                    fontSize: 18,
                    color: "gray",
                    textAlign: "center"
                }}>{MAIN_CHATS_PAGE_TEXT}</Text>

                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: 'indigo'}}
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
