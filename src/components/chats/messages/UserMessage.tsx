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
        },
        additionalInfoDateTime: {
            color: INDIGO,
            paddingRight: 20,
            fontSize: 11
        }
    });

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        const {message, date, advices} = this.props;

        const messageWithResolvedAdvices: ReactNode = advices.length > 0 ?
            AdviceResolver.resolveAll(advices) :
            (
                <Text>
                    {message}
                </Text>
            );

        return (
            <View style={UserMessage.styles.root}>
                <View style={UserMessage.styles.messageContainer}>
                    {messageWithResolvedAdvices}
                </View>
                <Text style={UserMessage.styles.additionalInfoDateTime}>
                    {date}
                </Text>
            </View>
        );
    }
}

export default UserMessage;
