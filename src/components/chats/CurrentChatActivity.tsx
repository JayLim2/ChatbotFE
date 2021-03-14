import React, {Component} from 'react';
import CurrentChat from "./CurrentChat";
import {StyleSheet} from 'react-native';
import {Button, Container, Content, Footer, Icon, View} from 'native-base';
import {INDIGO, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {Input} from "react-native-elements";
import {fetchFonts} from "../../configuration/Fonts";
import {getChatMessages, saveMessage} from "../client/Client";
import {openDatabase} from "../../services/DatabaseService";
import * as SQLite from "expo-sqlite";
import {SELECT_ALL_MESSAGES} from "../../queries/selectQueries";
import {insertMessagesQuery} from "../../queries/insertQueries";
import {DELETE_ALL_MESSAGES} from "../../queries/deleteQueries";
import {MaterialIndicator} from "react-native-indicators";
import {getCurrentDate} from "../utils/Utils";
import {withTranslation} from "react-i18next";
import {Message} from "../../models/Message";
import {ErrorResponse} from "../../models/HttpError";
import {LocalStorage} from "../utils/Storage";
import ActivityHeader from "../common/ActivityHeader";

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

    private chatId: number | undefined;
    private userId: number | undefined;

    constructor(props: any) {
        super(props);

        //get current chat id
        const routeParams = props.route.params;
        this.chatId = routeParams.chatId;

        //open database
        this.databaseInstance = openDatabase();

        //create state
        this.state = {
            isLoadingComplete: false,
            isMessagesLoadingComplete: false,
            messages: [],
            currentMessage: ""
        };

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

        //fetch messages
        this.onLoadMessages(Number(this.chatId));
    }

    async componentDidMount() {
        try {
            await fetchFonts();
            this.userId = await LocalStorage.getData("userId");
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
    updateMessagesState(messages: Message[]) {
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
    onLoadMessages(chatId: number) {
        //fetching of messages
        getChatMessages(chatId)
            .then((chatMessages: Message[]) => { //if no problems with network
                //refresh state of messages
                this.updateMessagesState(chatMessages);
                //remove old data
                // this.deleteAllMessagesFromDB(); //TODO maybe delete by ids?
                //try to insert into local DB
                // this.insertMessagesIntoDB(chatMessages);
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

        if (!currentMessage || currentMessage.trim() === "") {
            return;
        }

        //wrap messages as special object
        let userMessage = this.createMessage(currentMessage);

        //save messages on server
        //TODO неоптимизированно
        saveMessage(userMessage)
            .then((systemMessage: Message) => {
                this.clearCurrentMessage();
                this.enableLoader(true);
                this.onLoadMessages(Number(this.chatId));
            })
            .catch((error: ErrorResponse) => {
                console.error("Couldn't save message, caused by: ", error);
            })
    }

    /**
     * Wrap message data by Message object
     * @param message
     */
    createMessage(message: string) {
        let messageObj: Message = {
            message: message,
            user: {
                id: this.userId
            },
            chat: {
                id: this.chatId
            },
            dateTime: getCurrentDate()
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

    /* ############ DATABASE METHODS ################### */

    deleteAllMessagesFromDB() {
        const transactionFunction = (transaction: SQLite.SQLTransaction) => {
            transaction.executeSql(DELETE_ALL_MESSAGES);
        };

        const transactionErrorHandler = (error: SQLite.SQLError) => {
            console.log("Error during deleting all messages from local DB: \n\t", error);
        };

        this.databaseInstance.transaction(
            transactionFunction,
            transactionErrorHandler
        );
    }

    insertMessagesIntoDB(messages: Message[]) {
        //Encapsulate insert messages query into object
        let query: InsertMessageQuery = insertMessagesQuery(messages);

        /* Transaction callbacks */
        const transactionFunction = (transaction: SQLite.SQLTransaction) => {
            transaction.executeSql(
                query.query as string,
                query.queryArgs as any[] | undefined
            )
        };

        const transactionErrorHandler = (error: SQLite.SQLError) => {
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
            currentTransaction: SQLite.SQLTransaction,
            resultSet: SQLite.SQLResultSet
        ) => {
            let rows = resultSet.rows;
            let rowsCount = rows.length;
            let messages: Message[] = [];
            for (let i = 0; i < rowsCount; i++) {
                let currentRow = rows.item(i);
                let message: Message = {
                    id: currentRow._id,
                    message: currentRow.message,
                    user: {
                        id: currentRow.userId
                    },
                    dateTime: currentRow.date
                };
                messages.push(message);
            }
            //refresh state of messages
            this.updateMessagesState(messages);
        };

        const queryErrorHandler = (
            currentTransaction: SQLite.SQLTransaction,
            error: SQLite.SQLError
        ) => {
            console.log("Read error: ", error);
            return true;
        };

        /* Transaction callbacks */
        const transactionFunction = (transaction: SQLite.SQLTransaction) => {
            transaction.executeSql(
                SELECT_ALL_MESSAGES,
                [],
                querySuccessHandler,
                queryErrorHandler
            );
        };

        const transactionErrorHandler = (error: SQLite.SQLError) => {
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

        const {t} = this.props;
        let chatNode = !isMessagesLoadingComplete ?
            <MaterialIndicator color={INDIGO} style={{marginTop: 100}}/> :
            <CurrentChat messages={messages}
                         navigation={navigation}
            />;

        return (
            <Container>
                <ActivityHeader navigation={navigation}
                                name={"chat"}
                />
                <Content>
                    {chatNode}
                </Content>
                <Footer>
                    <View style={CurrentChatActivity.styles.footerInput}>
                        <Input placeholder={t("chat:fields.input.placeholder")}
                               value={this.state.currentMessage}
                               onChangeText={this.onInputMessage}
                        />
                    </View>
                    <View style={CurrentChatActivity.styles.footerSend}>
                        <Button style={CurrentChatActivity.styles.sendButton}
                                onPress={this.onSendMessage}
                        >
                            <Icon type="MaterialCommunityIcons" name="send"/>
                        </Button>
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default withTranslation()(CurrentChatActivity);
