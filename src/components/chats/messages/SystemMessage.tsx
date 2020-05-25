import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {MessageProps} from "./MessageProps";

class SystemMessage extends Component<any, any>{

    constructor(props: MessageProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {message} = this.props;

        const margin: number = 15;

        const styles = StyleSheet.create({
            root: {
                width: "100%",
                alignItems: "flex-start"
            },
            messageContainer: {
                width: "75%",
                padding:20,
                margin: margin,
                marginTop: margin / 2,
                marginBottom: margin / 2,
                backgroundColor:"#DDD",
                borderRadius: 10
            },
            messageText: {
                color: "#000",
                textAlign: "left"
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

export default SystemMessage;
