import React, {useEffect, useState} from 'react';
import LoginForm from "./LoginForm";
import {Body, Button, Container, Content, Header, Icon, Right, Title} from 'native-base';
import {SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";

const LoginActivity = ({navigation}) => {

    //##################### INITIALIZE ##########################
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    const init = async () => {
        try {
            await fetchFonts();
        } catch (e) {
            console.warn(e);
        } finally {
            setLoadingComplete(true);
        }
    }

    useEffect(() => {
        init();
    }, []);

    if (!isLoadingComplete) {
        return null;
    }
    //----------------------------------------------------

    const onClickMenu = () => {
        navigation.navigate(SETTINGS_ACTIVITY);
    }

    return (
        <Container>
            <Header style={{backgroundColor: "indigo"}} androidStatusBarColor={"indigo"}>
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
