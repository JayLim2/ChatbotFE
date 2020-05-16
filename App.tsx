import React from 'react';
import LoginActivity from "./src/components/login/LoginActivity";
import ChatsActivity from "./src/components/chats/ChatsActivity";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
              <Stack.Screen name="Login" component={LoginActivity} />
              <Stack.Screen name="ChatsList" component={ChatsActivity} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
