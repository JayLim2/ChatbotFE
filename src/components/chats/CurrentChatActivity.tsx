import React, {Component} from 'react';
import CurrentChat from "./CurrentChat";
import {StyleSheet} from 'react-native';
import {Body, Button, Container, Content, Footer, Header, Icon, Left, Right, Title, View} from 'native-base';
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {MESSAGE_INPUT_PLACEHOLDER} from "../../configuration/Constants";
import {Input} from "react-native-elements";
import {MessageProps} from "./messages/MessageProps";

class CurrentChatActivity extends Component<any, any> {

    static styles = StyleSheet.create({
        footerInput: {
            borderTopWidth: 1,
            borderTopColor: "indigo",
            width: "80%",
            backgroundColor: "#FFF"
        },
        footerSend: {
            borderTopWidth: 1,
            borderTopColor: "indigo",
            width: "20%",
            backgroundColor: "#FFF",
            alignItems: "center"
        },
        sendButton: {
            backgroundColor: "indigo",
            padding:5,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10
        }
    });

    constructor(props: object) {
        super(props);
        this.state = {
            loading: true,
            messages: [],
            currentMessage: ""
        }
        this.fetchFonts = this.fetchFonts.bind(this);
        this.onInputMessage = this.onInputMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    fetchFonts() {
        return Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }

    onInputMessage(newMessage: string) {
        this.setState({
            currentMessage: newMessage
        })
    }

    onSendMessage() {
        const messages = this.state.messages;
        const currentMessage = this.state.currentMessage;
        this.setState({
            messages: [
                ...messages,
                this.createMessage(
                    currentMessage,
                    "Sergei Komarov",
                    {},
                    "USER"
                ),
                this.createMessage(
                    "Kill all humans",
                    "Skynet",
                    {},
                    "SYSTEM"
                )
            ],
            currentMessage: ""
        })
    }

    createMessage(message: string, username: string, date: object, type: string) {
        let messageObj: MessageProps = {
            message: message,
            username: username,
            date: date,
            type: type
        };
        return messageObj;
    }

    render() {
        if (this.state.loading) {
            return <AppLoading
                startAsync={this.fetchFonts}
                onFinish={() => this.setState({loading: false})}
                onError={e => console.error(e)}
            />;
        }

        const {messages} = this.state;
        let {navigation} = this.props;

        return (
            <Container>
                <Header style={{backgroundColor: "indigo"}} androidStatusBarColor={"indigo"}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chat</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <CurrentChat messages={messages} navigation={navigation}/>
                </Content>
                <Footer>
                    <View style={CurrentChatActivity.styles.footerInput}>
                        <Input placeholder={MESSAGE_INPUT_PLACEHOLDER}
                               value={this.state.currentMessage}
                               onChangeText={this.onInputMessage}
                        />
                    </View>
                    <View style={CurrentChatActivity.styles.footerSend}>
                        <Button style={CurrentChatActivity.styles.sendButton} onPress={this.onSendMessage}>
                            <Icon type="MaterialCommunityIcons" name="send" />
                        </Button>
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default CurrentChatActivity;
