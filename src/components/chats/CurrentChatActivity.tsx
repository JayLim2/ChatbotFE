import React, {Component} from 'react';
import CurrentChat from "./CurrentChat";
import {StyleSheet} from 'react-native';
import {Body, Button, Container, Content, Footer, Header, Icon, Left, Right, Title, View} from 'native-base';
import {AppLoading} from "expo";
import {MESSAGE_INPUT_PLACEHOLDER, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {Input} from "react-native-elements";
import {MessageProps} from "./messages/MessageProps";
import {fetchFonts} from "../../configuration/Fonts";
import {getAllMessages, saveAllMessages} from "../client/Client";
import {openDatabase} from "../../configuration/DatabaseProperties";
import * as SQLite from "expo-sqlite";

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
            padding: 5,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10
        }
    });

    //database instance
    databaseInstance: SQLite.WebSQLDatabase;

    constructor(props: object) {
        super(props);

        //open database
        this.databaseInstance = openDatabase();

        //create state
        this.state = {
            isLoadingComplete: false,
            messages: [],
            currentMessage: ""
        }

        //events handler
        this.onLoadMessages = this.onLoadMessages.bind(this);
        this.onInputMessage = this.onInputMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.onReturnBack = this.onReturnBack.bind(this);

        //other methods
        this.createMessage = this.createMessage.bind(this);
        this.getTestAnswer = this.getTestAnswer.bind(this);

        //fetch messages
        this.onLoadMessages();
    }

    async componentDidMount() {
        try {
            await fetchFonts();
        } catch (e) {
            console.warn(e);
        } finally {
            this.setState({
                isLoadingComplete: true
            });
        }
    }

    /**
     * Load all messages
     */
    onLoadMessages() {
        getAllMessages()
            .then(result => { //if no problems with network
                let messages: MessageProps[] = result;
                this.setState({
                    messages: messages
                })
            })
            .catch(e => { //if any problems with network
                //TODO select from DB
                this.databaseInstance.readTransaction(
                    (transaction) => {
                        transaction.executeSql("SELECT * FROM messages");
                    }
                )
            })
    }

    /**
     * Handler for changing input field "Message"
     * @param newMessage
     */
    onInputMessage(newMessage: string) {
        this.setState({
            currentMessage: newMessage
        })
    }

    /**
     * Handler for click on button "Send message"
     */
    onSendMessage() {
        const messages = this.state.messages;
        const currentMessage = this.state.currentMessage;
        let userMessage = this.createMessage(
            currentMessage,
            "USER",
            "31.05.2020 16:00"
        );
        let systemMessage = this.createMessage(
            this.getTestAnswer(userMessage),
            "SYSTEM",
            "31.05.2020 16:01"
        );
        //TODO insert here sending onto server
        saveAllMessages([userMessage, systemMessage])
            .then(result => {
                //result - error message or JsonArray with messages ids
                this.setState({
                    messages: [...messages, userMessage, systemMessage],
                    currentMessage: ""
                })
            })
        //------------------------------------
    }

    /**
     * Wrap message data by MessageProps object
     * @param message
     * @param userId
     * @param date
     */
    createMessage(message: string, userId: string, date: string) {
        let messageObj: MessageProps = {
            message: message,
            userId: userId,
            date: date
        };
        return messageObj;
    }

    /**
     * Handler for click on "Settings" button
     */
    onClickMenu() {
        this.props.navigation.navigate(SETTINGS_ACTIVITY);
    }

    /**
     * Handler for click on "Back" button
     */
    onReturnBack() {
        this.props.navigation.goBack();
    }

    /**
     * Get hardcoded message by user message text
     * @param userMessage
     */
    getTestAnswer(userMessage: MessageProps) {
        let message = userMessage.message;
        if (message) {
            message = message.trim().toLowerCase();
        }
        let answer;
        switch (message) {
            case "hello":
                answer = "Hello, " + userMessage.userId;
                break;
            case "hi":
                answer = "Hi, bro :)";
                break;
            case "it's good weather today":
                answer = "But I don't like...";
                break;
            case "bye":
                answer = "See you later!";
                break;
            default:
                answer = "Kill. All. Humans.";
        }
        return answer;
    }

    render() {
        if (!this.state.isLoadingComplete) {
            return null;
        }

        const {messages} = this.state;
        let {navigation} = this.props;

        return (
            <Container>
                <Header style={{backgroundColor: "indigo"}} androidStatusBarColor={"indigo"}>
                    <Left>
                        <Button transparent onPress={this.onReturnBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chat</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onClickMenu}>
                            <Icon name='settings'/>
                        </Button>
                    </Right>
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
                            <Icon type="MaterialCommunityIcons" name="send"/>
                        </Button>
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default CurrentChatActivity;
