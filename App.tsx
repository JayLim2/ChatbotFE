import React from 'react';

//Navigation between activities
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Custom components
import LoginActivity from "./src/components/login/LoginActivity";
import ChatsActivity from "./src/components/chats/ChatsActivity";
import CurrentChatActivity from "./src/components/chats/CurrentChatActivity";
import SettingsActivity from "./src/components/settings/SettingsActivity";

const Stack = createStackNavigator();

//Routes names
export const LOGIN_ACTIVITY = "Login";
export const HOME_ACTIVITY = "Home";
export const CURRENT_CHAT_ACTIVITY = "CurrentChat";
export const SETTINGS_ACTIVITY = "Settings";

const App = () => {
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
