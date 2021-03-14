import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'native-base';

import {CURRENT_CHAT_ACTIVITY} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";
import {getCurrentUserChats} from "../client/Client";
import {Chat} from "../../models/Chat";
import {ErrorResponse} from "../../models/HttpError";

class ChatsList extends Component<any, any> {

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
                    // console.warn("Chat: ", JSON.stringify(chat));
                    return (
                        <View key={`chat-${chat.id}`}
                              style={{
                                  borderTopWidth: 1,
                                  borderTopColor: "#e1e1e1",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#e1e1e1",
                                  paddingHorizontal: 20,
                                  paddingVertical: 30,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "flex-start"
                              }}
                              data-chatId={chat.id}
                              onTouchEnd={() => {this.onOpenChatClick(chat.id);}}
                        >
                            <View style={{
                                width: 48,
                                height: 48,
                                backgroundColor: "indigo",
                                borderRadius: 24,
                                marginRight: 10,
                                padding: 10
                            }}>
                                <Icon type="MaterialCommunityIcons"
                                      name="chat"
                                      style={{
                                          color: "white"
                                      }}
                                />
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 18,
                                    color: "black"
                                }}>
                                    {`${t("chatsList:text.chatHeader")}${chat.id}`}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: "gray"
                                }}>
                                    {!chat.messages || chat.messages.length === 0 ?
                                        t("chatsList:text.chatPlaceholder") :
                                        chat.messages[0].message
                                    }
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default withTranslation()(ChatsList);
