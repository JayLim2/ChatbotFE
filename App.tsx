import React from 'react';

//Navigation between activities
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Custom components
import LoginActivity from "./src/components/login/LoginActivity";
import ChatsActivity from "./src/components/chats/ChatsActivity";
import CurrentChatActivity from "./src/components/chats/CurrentChatActivity";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="Login" component={LoginActivity}/>
                <Stack.Screen name="ChatsList" component={ChatsActivity}/>
                <Stack.Screen name="CurrentChat" component={CurrentChatActivity}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
