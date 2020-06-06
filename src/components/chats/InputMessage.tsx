import React, {Component} from "react";
import {Input} from "react-native-elements";
import CurrentChatActivity from "./CurrentChatActivity";
import {Text, Button, View} from "native-base";
import {withTranslation} from "react-i18next";

class InputMessage extends Component<any, any> {

    constructor(props: {
        affectedComponent: CurrentChatActivity
    }) {
        super(props);
        this.state = {
            message: ""
        }
        this.onInputMessage = this.onInputMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onInputMessage(newMessage: string) {
        this.setState({
            message: newMessage
        })
    }

    onSendMessage() {
        const {affectedComponent} = this.props;
        affectedComponent.setState({
            messages: [...affectedComponent.state.messages, this.state.message]
        })
    }

    render(): React.ReactNode {
        const {t} = this.props;
        return (
            <View>
                <Input placeholder={t("chat:fields.input.placeholder")}
                       onChangeText={this.onInputMessage}
                />
            </View>
        );
    }
}

// @ts-ignore
export default withTranslation()(InputMessage);
