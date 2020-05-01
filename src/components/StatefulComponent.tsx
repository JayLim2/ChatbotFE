import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {CHANGE_BUTTON_TEXT} from "../configuration/Constants";

class StatefulComponent extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            message: "Unstable Message ",
            counter: 0
        }
        this.onPress = this.onPress.bind(this);
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
        const {message} = this.state;

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <Text>{message}</Text>
                <Button title={CHANGE_BUTTON_TEXT} onPress={this.onPress}/>
            </View>
        )
    }
}

export default StatefulComponent;