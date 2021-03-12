import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {BLACK} from "../../../configuration/Constants";
import {Message} from "../../../models/Message";

class SystemMessage extends Component<any, any> {

    static margin: number = 15;

    static styles = StyleSheet.create({
        root: {
            width: "100%",
            alignItems: "flex-start"
        },
        messageContainer: {
            width: "75%",
            padding: 20,
            margin: SystemMessage.margin,
            marginTop: SystemMessage.margin / 2,
            marginBottom: SystemMessage.margin / 2,
            backgroundColor: "#DDD",
            borderRadius: 10
        },
        messageText: {
            color: BLACK,
            textAlign: "left"
        }
    })

    constructor(props: Message) {
        super(props);
    }

    render(): React.ReactNode {
        const {message, date} = this.props;

        return (
            <View style={SystemMessage.styles.root}>
                <View style={SystemMessage.styles.messageContainer}>
                    <Text style={SystemMessage.styles.messageText}>{message}</Text>
                </View>
                <Text style={{
                    color:"gray",
                    paddingLeft:20,
                    fontSize:11
                }}>
                    {date}
                </Text>
            </View>
        );
    }
}

export default SystemMessage;
