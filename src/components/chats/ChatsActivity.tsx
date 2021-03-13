import React, {useEffect, useState} from 'react';
import {Body, Button, Container, Content, Header, Icon, Right, Title} from 'native-base';
import ChatsList from "./ChatsList";
import {INDIGO, LOGIN_ACTIVITY, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import i18n from "assets/i18nx";
import {withTranslation} from "react-i18next";
import {LocalStorage} from "../utils/Storage";
import ActivityHeader from "../common/ActivityHeader";

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

    return (
        <Container>
            <ActivityHeader navigation={navigation}
                            name={"chatsList"}
            />
            <Content contentContainerStyle={{flexGrow: 1}}>
                <ChatsList navigation={navigation}/>
            </Content>
        </Container>
    )
};

// @ts-ignore
export default withTranslation()(ChatsActivity);
