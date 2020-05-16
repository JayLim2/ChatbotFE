import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import {
    Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Left, Right,
    Body, Icon, Text
} from 'native-base';
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    });
}

const LoginActivity = ({navigation}) => {

    const [loading, setLoading] = useState(true);

    if(loading) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setLoading(false)}
            onError={e => console.error(e)}
        />;
    }

    return (
        <Container>
            <Header style={{backgroundColor:"indigo"}} androidStatusBarColor={"indigo"}>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Login</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <LoginForm navigation={navigation}/>
            </Content>
        </Container>
    );
}

export default LoginActivity;
