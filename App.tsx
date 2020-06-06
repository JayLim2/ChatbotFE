import React, {useEffect} from 'react';
//Navigation between activities
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Custom components
import LoginActivity from "./src/components/login/LoginActivity";
import ChatsActivity from "./src/components/chats/ChatsActivity";
import CurrentChatActivity from "./src/components/chats/CurrentChatActivity";
import SettingsActivity from "./src/components/settings/SettingsActivity";
import {openDatabase} from "./src/configuration/DatabaseProperties";
import {CREATE_MESSAGES_TABLE} from "./src/queries/createQueries";
import {SQLite} from "expo/build/globals.web";
import {LOGIN_ACTIVITY, HOME_ACTIVITY, CURRENT_CHAT_ACTIVITY, SETTINGS_ACTIVITY} from "./src/configuration/Constants"
import {initReactI18next} from "react-i18next";
import languages from "assets/languages";
import i18next from "i18next";

const Stack = createStackNavigator();

const createMessagesTable = (databaseInstance: SQLite.WebSQLDatabase) => {
    const transactionCallback = (transaction: SQLTransaction) => {
        transaction.executeSql(CREATE_MESSAGES_TABLE);
    };

    const transactionErrorCallback = (error: SQLError) => {
        console.error(error.code + ": " + error.message);
    };

    const transactionSuccessCallback = () => {
        console.log("Table 'Messages' created successfully.");
    };

    databaseInstance.transaction(
        transactionCallback,
        transactionErrorCallback,
        transactionSuccessCallback
    );
}

const initialize = () => {
    let databaseInstance = openDatabase();
    //create table 'Messages'
    createMessagesTable(databaseInstance);
    i18next
        .use(initReactI18next)
        .init({
            //debug: true,
            lng: "en",
            fallbackLng: 'en',
            ns: ["login", "settings", "chatsList", "chat"],
            resources: languages,
            interpolation: {
                escapeValue: false, // not needed for react as it does escape per default to prevent xss!
            },
        });
}

const App = () => {

    useEffect(initialize);

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name={LOGIN_ACTIVITY} component={LoginActivity}/>
                <Stack.Screen name={HOME_ACTIVITY} component={ChatsActivity}/>
                <Stack.Screen name={CURRENT_CHAT_ACTIVITY} component={CurrentChatActivity}/>
                <Stack.Screen name={SETTINGS_ACTIVITY} component={SettingsActivity}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
