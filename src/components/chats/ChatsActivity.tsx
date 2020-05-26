import React, {useState} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import ChatsList from "./ChatsList";
import {SETTINGS_ACTIVITY} from "../../configuration/Constants";

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    });
}

const ChatsActivity = ({navigation}) => {

    const [loading, setLoading] = useState(true);

    if (loading) {
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
            <Header style={{backgroundColor: "indigo"}} androidStatusBarColor={"indigo"}>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                    <Button transparent onPress={onClickMenu}>
                        <Icon name='settings'/>
                    </Button>
                </Right>
            </Header>
            <Content contentContainerStyle={{flexGrow: 1}}>
                <ChatsList navigation={navigation}/>
            </Content>
        </Container>
    )
}

export default ChatsActivity;
