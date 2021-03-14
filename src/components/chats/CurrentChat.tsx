import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SystemMessage from "./messages/SystemMessage";
import UserMessage from "./messages/UserMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import {ChatProps} from "./ChatProps";
import {LocalStorage} from "../utils/Storage";
import {Message} from "../../models/Message";
import {GRAY} from "../../configuration/Constants";

class CurrentChat extends React.Component<any, any> {

    static styles = StyleSheet.create({
        scrollView: {
            paddingVertical: 10
        },
        emptyChatPlaceholderContainer: {
            alignItems: "center",
            paddingTop: "75%",
            paddingBottom: "75%"
        },
        emptyChatPlaceholder: {
            fontSize: 18,
            color: GRAY,
            textAlign: "center"
        }
    })

    //References to components
    private scrollView: ScrollView | null = null;

    constructor(props: WithTranslation & ChatProps) {
        super(props);
        this.state = {
            userId: null
        };
    }

    componentDidMount() {
        LocalStorage.getData("userId")
            .then((userId: any) => {
                this.setState({
                    userId: Number(userId)
                });
            })
            .catch((e) => {
                console.error(e);
            });
        setTimeout(() => {
            this.scrollView?.scrollToEnd({animated:true});
        }, 50);
    }

    //FIXME doesn't work!
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        setTimeout(() => {
            this.scrollView?.scrollToEnd({animated:true});
        }, 50);
    }

    render(): React.ReactNode {
        if (!this.state.userId) {
            return null;
        }

        const messages: Message[] = this.props.messages;
        const {t} = this.props;
        let messagesItems: React.ReactNode[] = [];

        if (messages) {
            let k: number = 0;
            for (const message of messages) {
                messagesItems.push(
                    message.user?.id !== this.state.userId ?
                        <SystemMessage key={++k}
                                       message={message.message}
                                       date={message.dateTime}
                                       userName={message.user?.login}
                        /> :
                        <UserMessage key={++k}
                                     message={message.message}
                                     date={message.dateTime}
                                     userName={message.user?.login}
                                     advices={message.advices}
                        />
                );
            }
        }

        return (
            <ScrollView
                ref={ref => this.scrollView = ref}
                style={CurrentChat.styles.scrollView}
            >
                {messagesItems.length > 0 ?
                    messagesItems :
                    <View style={CurrentChat.styles.emptyChatPlaceholderContainer}>
                        <Text style={CurrentChat.styles.emptyChatPlaceholder}>
                            {t("chat:noMessagesPrompt")}
                        </Text>
                    </View>
                }
            </ScrollView>
        );
    }

}

export default withTranslation()(CurrentChat);
