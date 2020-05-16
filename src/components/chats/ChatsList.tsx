import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";

class ChatsList extends Component<any, any> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            //reserved for state
        }
    }

    render() {
        return (
            <View>
                <Text>No chats.</Text>
            </View>
        )
    }
}

export default ChatsList;
