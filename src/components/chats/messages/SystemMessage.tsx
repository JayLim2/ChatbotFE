import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {BLACK} from "../../../configuration/Constants";
import {Message} from "../../../models/Message";
import {Image} from "react-native";

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
        }
    })

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        const {message, date, userName} = this.props;

        return (
            <View style={SystemMessage.styles.root}>
                <View style={{
                    borderColor: "#DDD",
                    borderWidth: 1,
                    borderRadius: 20,
                    marginTop: 8,
                    marginLeft: 15
                }}>
                    <Image source={require('../../../assets/images/avatars/bender.jpg')}
                           style={{
                               width: 40,
                               height: 40,
                               borderRadius: 20
                           }}
                    />
                </View>
                <View>
                    <View style={SystemMessage.styles.messageContainer}>
                        <Text style={SystemMessage.styles.messageText}>{message}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        paddingLeft: 15,
                    }}>
                        <Text style={{
                            color: "indigo",
                            fontWeight: "bold",
                            fontSize: 11,
                            marginRight: 5
                        }}>
                            {"Bender"}
                        </Text>
                        <Text style={{
                            color: "gray",
                            fontSize: 11
                        }}>
                            {`at ${date}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default SystemMessage;
