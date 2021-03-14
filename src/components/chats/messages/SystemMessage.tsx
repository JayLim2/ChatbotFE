import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {BLACK, GRAY} from "../../../configuration/Constants";
import {Message} from "../../../models/Message";
import {Image} from "react-native";
import {withTranslation} from "react-i18next";

class SystemMessage extends Component<any, any> {

    static margin: number = 15;

    static styles = StyleSheet.create({
        root: {
            width: "100%",
            alignItems: "flex-start",
            flexDirection: "row"
        },
        messageContainer: {
            width: "100%",
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
        },
        avatarContainer: {
            borderColor: "#DDD",
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 8,
            marginLeft: 15
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20
        },
        additionalInfoContainer: {
            flexDirection: "row",
            paddingLeft: 15,
        },
        additionalInfoUsername: {
            color: INDIGO,
            fontWeight: "bold",
            fontSize: 11,
            marginRight: 5
        },
        additionalInfoDateTime: {
            color: GRAY,
            fontSize: 11
        }
    })

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        const {message, date, userName, t} = this.props;

        return (
            <View style={SystemMessage.styles.root}>
                <View style={SystemMessage.styles.avatarContainer}>
                    <Image source={require('../../../assets/images/avatars/bender.jpg')}
                           style={SystemMessage.styles.avatar}
                    />
                </View>
                <View>
                    <View style={SystemMessage.styles.messageContainer}>
                        <Text style={SystemMessage.styles.messageText}>{message}</Text>
                    </View>
                    <View style={SystemMessage.styles.additionalInfoContainer}>
                        <Text style={SystemMessage.styles.additionalInfoUsername}>
                            {t("common:systemUsername")}
                        </Text>
                        <Text style={SystemMessage.styles.additionalInfoDateTime}>
                            {`${date}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default withTranslation()(SystemMessage);
