import React, {Component} from 'react';
import CurrentChat from "./CurrentChat";
import {StyleSheet} from 'react-native';
import {Body, Button, Container, Content, Footer, Header, Icon, Left, Right, Title, View} from 'native-base';
import {AppLoading} from "expo";
import {INDIGO, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {Input} from "react-native-elements";
import {MessageProps} from "./messages/MessageProps";
import {fetchFonts} from "../../configuration/Fonts";
import {getAllMessages, saveAllMessages} from "../client/Client";
import {openDatabase} from "../../configuration/DatabaseProperties";
import * as SQLite from "expo-sqlite";
import {SELECT_ALL_MESSAGES} from "../../queries/selectQueries";
import {insertMessagesQuery} from "../../queries/insertQueries";
import {DELETE_ALL_MESSAGES} from "../../queries/deleteQueries";
import {MaterialIndicator} from "react-native-indicators";
import {getCurrentDate} from "../utils/Utils";
import i18n from "i18next";

class CurrentChatActivity extends Component<any, any> {

    static styles = StyleSheet.create({
        footerInput: {
            borderTopWidth: 1,
            borderTopColor: INDIGO,
            width: "80%",
            backgroundColor: "#FFF"
        },
        footerSend: {
            borderTopWidth: 1,
            borderTopColor: INDIGO,
            width: "20%",
            backgroundColor: "#FFF",
            alignItems: "center"
        },
        sendButton: {
            backgroundColor: INDIGO,
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
            isMessagesLoadingComplete: false,
            messages: [],
            currentMessage: ""
        }

        //state updaters
        this.updateMessagesState = this.updateMessagesState.bind(this);
        this.enableLoader = this.enableLoader.bind(this);
        this.clearCurrentMessage = this.clearCurrentMessage.bind(this);

        //events handler
        this.onLoadMessages = this.onLoadMessages.bind(this);
        this.onInputMessage = this.onInputMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.onReturnBack = this.onReturnBack.bind(this);

        //database
        this.deleteAllMessagesFromDB = this.deleteAllMessagesFromDB.bind(this);
        this.insertMessagesIntoDB = this.insertMessagesIntoDB.bind(this);
        this.fetchMessagesFromDB = this.fetchMessagesFromDB.bind(this);

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

    /* State updaters */

    /**
     * Update parameter "messages" in state
     * @param messages
     */
    updateMessagesState(messages: MessageProps[]) {
        this.setState({
            messages: messages,
            isMessagesLoadingComplete: true
        })
    }

    enableLoader(isEnabled: true) {
        this.setState({
            isMessagesLoadingComplete: !isEnabled
        });
    }

    clearCurrentMessage() {
        this.setState({
            currentMessage: ""
        })
    }

    /* End of state updaters */

    /**
     * Load all messages
     *
     * At first tries load messages from server.
     * If there are any network connection problems
     * - tries load messages from local DB.
     *
     */
    onLoadMessages() {
        //fetching of messages
        getAllMessages()
            .then(result => { //if no problems with network
                let messages: MessageProps[] = result;
                //refresh state of messages
                this.updateMessagesState(messages);
                //remove old data
                this.deleteAllMessagesFromDB(); //TODO maybe delete by ids?
                //try to insert into local DB
                this.insertMessagesIntoDB(messages);
            })
            .catch(e => { //if any problems with network
                this.fetchMessagesFromDB();
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
        const currentMessage = this.state.currentMessage;
        const currentDate: string = getCurrentDate();

        //wrap messages as special object
        let userMessage = this.createMessage(
            currentMessage,
            "USER",
            currentDate
        );
        let systemMessage = this.createMessage(
            this.getTestAnswer(userMessage),
            "SYSTEM",
            currentDate
        );

        //save messages on server
        saveAllMessages([userMessage, systemMessage])
            .then(result => {
                //result - error message or JsonArray with messages ids
                if (typeof result === "object") {
                    this.clearCurrentMessage();
                    this.enableLoader(true);
                    this.onLoadMessages();
                }
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

    /* ############ DATABASE METHODS ################### */

    deleteAllMessagesFromDB() {
        const transactionFunction = (transaction: SQLTransaction) => {
            transaction.executeSql(DELETE_ALL_MESSAGES);
        };

        const transactionErrorHandler = (error: SQLError) => {
            console.log("Error during deleting all messages from local DB: \n\t", error);
        }

        this.databaseInstance.transaction(
            transactionFunction,
            transactionErrorHandler
        );
    }

    insertMessagesIntoDB(messages: MessageProps[]) {
        //Encapsulate insert messages query into object
        let query: InsertMessageQuery = insertMessagesQuery(messages);

        /* Transaction callbacks */
        const transactionFunction = (transaction: SQLTransaction) => {
            transaction.executeSql(
                query.query as DOMString,
                query.queryArgs as ObjectArray
            )
        };

        const transactionErrorHandler = (error: SQLError) => {
            console.log("Error during inserting array of messages into local DB: \n\t", error);
        };

        //Begin transaction
        this.databaseInstance.transaction(
            transactionFunction,
            transactionErrorHandler
        );
    }

    fetchMessagesFromDB() {
        /* Query callbacks */
        const querySuccessHandler = (
            currentTransaction: SQLTransaction,
            resultSet: SQLResultSet
        ) => {
            let rows = resultSet.rows;
            let rowsCount = rows.length;
            let messages: MessageProps[] = [];
            for (let i = 0; i < rowsCount; i++) {
                let currentRow = rows.item(i);
                let message: MessageProps = {
                    id: currentRow._id,
                    message: currentRow.message,
                    userId: currentRow.userId,
                    date: currentRow.date
                };
                messages.push(message);
            }
            //refresh state of messages
            this.updateMessagesState(messages);
        };

        const queryErrorHandler = (
            currentTransaction: SQLTransaction,
            error: SQLError
        ) => {
            console.log("Read error: ", error);
            return true;
        };

        /* Transaction callbacks */
        const transactionFunction = (transaction: SQLTransaction) => {
            transaction.executeSql(
                SELECT_ALL_MESSAGES,
                [],
                querySuccessHandler,
                queryErrorHandler
            );
        };

        const transactionErrorHandler = (error: SQLError) => {
        };

        const transactionSuccessHandler = () => {
        };

        //Begin transaction
        this.databaseInstance.readTransaction(
            transactionFunction,
            transactionErrorHandler,
            transactionSuccessHandler
        )
    }

    /* ################################################ */

    render() {
        if (!this.state.isLoadingComplete) {
            return null;
        }

        const {isMessagesLoadingComplete, messages} = this.state;
        let {navigation} = this.props;

        let chatNode = !isMessagesLoadingComplete ?
            <MaterialIndicator color={INDIGO} style={{marginTop:100}}/> :
            <CurrentChat messages={messages} navigation={navigation}/>;

        return (
            <Container>
                <Header style={{backgroundColor: INDIGO}}
                        androidStatusBarColor={INDIGO}
                >
                    <Left>
                        <Button transparent onPress={this.onReturnBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{i18n.t("chat:title")}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onClickMenu}>
                            <Icon name='settings'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {chatNode}
                </Content>
                <Footer>
                    <View style={CurrentChatActivity.styles.footerInput}>
                        <Input placeholder={i18n.t("chat:fields.input.placeholder")}
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
