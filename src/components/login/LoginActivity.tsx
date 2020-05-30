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
import {SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";

const LoginActivity = ({navigation}) => {

    const [loading, setLoading] = useState(true);

    if(loading) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setLoading(false)}
            onError={e => console.error(e)}
        />;
    }

    const onClickMenu = () => {
        navigation.navigate(SETTINGS_ACTIVITY);
    }

    return (
        <Container>
            <Header style={{backgroundColor:"indigo"}} androidStatusBarColor={"indigo"}>
                <Body>
                    <Title>Login</Title>
                </Body>
                <Right>
                    <Button transparent onPress={onClickMenu}>
                        <Icon name='settings'/>
                    </Button>
                </Right>
            </Header>
            <Content contentContainerStyle={{flexGrow: 1}}>
                <LoginForm navigation={navigation}/>
            </Content>
        </Container>
    );
}

export default LoginActivity;
