import React, {useState} from 'react';
import {Body, Button, Container, Content, Header, Icon, Right, Title} from 'native-base';
import {AppLoading} from "expo";
import ChatsList from "./ChatsList";
import {SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";

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
