import React, {Component} from 'react';
import {View} from 'react-native';
import {Fab, Icon, Text} from 'native-base';

import {CURRENT_CHAT_ACTIVITY, INDIGO} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";

class ChatsList extends Component<any, any>{

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            active: true
        };
        this.onOpenChatClick = this.onOpenChatClick.bind(this);
    }

    onOpenChatClick() {
        this.props.navigation.navigate(CURRENT_CHAT_ACTIVITY);
    }

    render(): React.ReactNode {
        const {t} = this.props;
        return (
            <View style={{
                height:"100%",
                padding:20,
                paddingTop:100
            }}>
                <Text style={{
                    fontSize: 18,
                    color: "gray",
                    textAlign: "center"
                }}>{t("chatsList:text.openChatPrompt")}</Text>

                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: INDIGO}}
                    position="bottomRight"
                    onPress={this.onOpenChatClick}
                >
                    <Icon type="MaterialCommunityIcons" name="chat" />
                </Fab>
            </View>
        );
    }
}

export default withTranslation()(ChatsList);
