import React, {useEffect, useState} from 'react';
import {Container, Content} from 'native-base';
import ChatsList from "./ChatsList";
import {fetchFonts} from "../../configuration/Fonts";
import {withTranslation} from "react-i18next";
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
