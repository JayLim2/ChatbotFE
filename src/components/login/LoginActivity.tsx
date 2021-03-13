import React, {useEffect, useState} from 'react';
import LoginForm from "./LoginForm";
import {Container, Content} from 'native-base';
import {HOME_ACTIVITY} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import {withTranslation} from "react-i18next";
import {LocalStorage} from "../utils/Storage";
import ActivityHeader from "../common/ActivityHeader";

const LoginActivity = ({navigation}: Readonly<any>) => {

    //##################### INITIALIZE ##########################
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    const init = async () => {
        try {
            await fetchFonts();
            const authToken = await LocalStorage.getData("token");
            if (authToken) {
                navigation.navigate(HOME_ACTIVITY);
            }
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
                            name={"login"}
            />
            <Content contentContainerStyle={{flexGrow: 1}}>
                <LoginForm navigation={navigation}/>
            </Content>
        </Container>
    );
};

export default withTranslation()(LoginActivity);
