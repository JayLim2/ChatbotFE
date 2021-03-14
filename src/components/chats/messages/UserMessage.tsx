import React, {Component, ReactNode} from "react";
import {StyleSheet, Text, View} from "react-native";
import {INDIGO, WHITE} from "../../../configuration/Constants";
import {Message} from "../../../models/Message";
import {AdviceResolver} from "../../utils/AdviceResolver";

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

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        const {message, date, advices} = this.props;

        const resolvedAdvices: ReactNode = AdviceResolver.resolveAll(advices);

        return (
            <View style={UserMessage.styles.root}>
                <View style={UserMessage.styles.messageContainer}>
                    {resolvedAdvices}
                </View>
                <Text style={{
                    color:"indigo",
                    paddingRight:20,
                    fontSize:11
                }}>
                    {date}
                </Text>
            </View>
        );
    }
}

export default UserMessage;
