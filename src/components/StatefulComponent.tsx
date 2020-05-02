import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {CHANGE_BUTTON_TEXT} from "../configuration/Constants";
import {Text, Button} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class StatefulComponent extends Component<any, any> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            message: "Unstable Message ",
            counter: 0,
            loading: true
        }
        this.onPress = this.onPress.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({
            loading: false
        })
    }

    onPress() {
        let newCounter = this.state.counter + 1;
        let newMessage = this.state.message + newCounter;
        this.setState({
            message: newMessage,
            counter: newCounter
        })
    }

    render() {
        if(this.state.loading) {
            return <View/>;
        }

        const {message} = this.state;

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: "50%"
            },
        });

        return (
            <View style={styles.container}>
                <Text>{message}</Text>
                <Button primary onPress={this.onPress}>
                    <Text>{CHANGE_BUTTON_TEXT}</Text>
                </Button>
            </View>
        )
    }
}

export default StatefulComponent;
