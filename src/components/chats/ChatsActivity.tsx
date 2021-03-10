import React, {useEffect, useState} from 'react';
import {Body, Button, Container, Content, Header, Icon, Right, Title} from 'native-base';
import ChatsList from "./ChatsList";
import {INDIGO, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import i18n from "assets/i18nx";
import {withTranslation} from "react-i18next";

const ChatsActivity = ({navigation}) => {

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
    };

    useEffect(() => {
        init();
    }, []);

    if (!isLoadingComplete) {
        return null;
    }
    //----------------------------------------------------

    const onClickMenu = () => {
        navigation.navigate(SETTINGS_ACTIVITY);
    };

    return (
        <Container>
            <Header style={{backgroundColor: INDIGO}}
                    androidStatusBarColor={INDIGO}
            >
                <Body>
                    <Title>{i18n.t("chatsList:title")}</Title>
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
};

// @ts-ignore
export default withTranslation()(ChatsActivity);
