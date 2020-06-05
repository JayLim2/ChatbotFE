import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {MessageProps} from "./MessageProps";
import {INDIGO, WHITE} from "../../../configuration/Constants";

class UserMessage extends Component<any, any> {

    static margin: number = 15;

    static styles = StyleSheet.create({
        root: {
            width: "100%",
            alignItems: "flex-end"
        },
        messageContainer: {
            width: "75%",
            padding: 20,
            margin: UserMessage.margin,
            marginTop: UserMessage.margin / 2,
            marginBottom: UserMessage.margin / 2,
            borderRadius: 10,
            backgroundColor: INDIGO,
        },
        messageText: {
            color: WHITE,
            textAlign: "right"
        }
    });

    constructor(props: MessageProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {message} = this.props;

        return (
            <View style={UserMessage.styles.root}>
                <View style={UserMessage.styles.messageContainer}>
                    <Text style={UserMessage.styles.messageText}>{message}</Text>
                </View>
            </View>
        );
    }
}

export default UserMessage;
