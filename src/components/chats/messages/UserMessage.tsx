import React, {Component} from "react";
import PropTypes, {InferProps} from 'prop-types';
import {StyleSheet, Text, View} from "react-native";
import {MessageProps} from "./MessageProps";

class UserMessage extends Component<any, any>{

    constructor(props: MessageProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {message} = this.props;

        const margin: number = 15;

        const styles = StyleSheet.create({
            root: {
                width: "100%",
                alignItems: "flex-end"
            },
            messageContainer: {
                width: "75%",
                padding:20,
                margin: margin,
                marginTop: margin / 2,
                marginBottom: margin / 2,
                borderRadius: 10,
                backgroundColor:"indigo",
            },
            messageText: {
                color: "#FFF",
                textAlign: "right"
            }
        })

        return (
            <View style={styles.root}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            </View>
        );
    }
}

export default UserMessage;
