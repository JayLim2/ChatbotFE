import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {CHANGE_BUTTON_TEXT} from "../configuration/Constants";
import {Text, Button, Root} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";

class StatefulComponent extends Component<any, any> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            message: "Unstable Message ",
            counter: 0,
            loading: true
        }
        this.onPress = this.onPress.bind(this);
        this.fetchFonts = this.fetchFonts.bind(this);
    }

    fetchFonts() {
        return Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
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
        if (this.state.loading) {
            return <AppLoading
                startAsync={this.fetchFonts}
                onFinish={() => this.setState({loading: false})}
                onError={e => console.error("Hello nigga")}
            />;
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
