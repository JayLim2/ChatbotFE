import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'native-base';

import {BLACK, CURRENT_CHAT_ACTIVITY, GRAY, INDIGO} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";
import {getCurrentUserChats} from "../client/Client";
import {Chat} from "../../models/Chat";
import {ErrorResponse} from "../../models/HttpError";

class ChatsList extends Component<any, any> {

    static styles = StyleSheet.create({
        flexRow: {
            flexDirection: "row"
        },
        chat: {
            borderTopWidth: 1,
            borderTopColor: "#e1e1e1",
            borderBottomWidth: 1,
            borderBottomColor: "#e1e1e1",
            paddingHorizontal: 20,
            paddingVertical: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        chatHeader: {
            fontSize: 18,
            color: BLACK
        },
        chatPlaceholder: {
            fontSize: 14,
            color: GRAY
        },
        usernamePlaceholder: {
            fontSize: 14,
            color: INDIGO,
            fontWeight: "bold",
            marginRight: 5
        },
        messagePlaceholder: {
            fontSize: 14,
            color: GRAY
        },
        messageAvatar: {
            width: 48,
            height: 48,
            backgroundColor: INDIGO,
            borderRadius: 24,
            marginRight: 10,
            padding: 10
        }
    })

    constructor(props: any) {
        super(props);
        this.state = {
            active: true,
            chats: []
        };
        this.onLoadChats = this.onLoadChats.bind(this);
        this.onOpenChatClick = this.onOpenChatClick.bind(this);
    }

    componentDidMount() {
        this.onLoadChats();
    }

    onLoadChats() {
        getCurrentUserChats()
            .then((chats: Chat[]) => {
                this.setState({
                    chats: chats
                });
            })
            .catch((error: ErrorResponse) => {
                alert("Ошибка загрузки чатов.");
                this.setState({
                    chats: []
                });
            });
    }

    onOpenChatClick(chatId: number | undefined) {
        this.props.navigation.navigate(CURRENT_CHAT_ACTIVITY, {
            chatId: chatId
        });
    }

    render(): React.ReactNode {
        const {t} = this.props;
        return (
            <View style={{height: "100%"}}>
                {this.state.chats.map((chat: Chat) => {
                    return (
                        <View key={`chat-${chat.id}`}
                              style={ChatsList.styles.chat}
                              data-chatId={chat.id}
                              onTouchEnd={() => {this.onOpenChatClick(chat.id);}}
                        >
                            <View style={ChatsList.styles.messageAvatar}>
                                <Icon type="MaterialCommunityIcons"
                                      name="chat"
                                      style={{color: "white"}}
                                />
                            </View>
                            <View>
                                <Text style={ChatsList.styles.chatHeader}>
                                    {`${t("chatsList:text.chatHeader")}${chat.id}`}
                                </Text>
                                {!chat.messages || chat.messages.length === 0 ?
                                    <Text style={ChatsList.styles.chatPlaceholder}>
                                        {t("chatsList:text.chatPlaceholder")}
                                    </Text> :
                                    <View style={ChatsList.styles.flexRow}>
                                        <Text style={ChatsList.styles.usernamePlaceholder}>
                                            {`${chat.messages[chat.messages.length - 1].user?.login === "SYSTEM" ?
                                                t("common:systemUsername") : 
                                                chat.messages[chat.messages.length - 1].user?.login}:`}
                                        </Text>
                                        <Text style={ChatsList.styles.messagePlaceholder}>
                                            {chat.messages[chat.messages.length - 1].message}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default withTranslation()(ChatsList);
