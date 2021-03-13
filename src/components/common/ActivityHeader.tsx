import {INDIGO, LOGIN_ACTIVITY, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import React from "react";
import {LocalStorage} from "../utils/Storage";
import {withTranslation} from "react-i18next";

const ActivityHeader = ({navigation, name, t}: Readonly<any>) => {

    const onReturnBack = () => {
        navigation.goBack();
    }

    const onOpenSettings = () => {
        navigation.navigate(SETTINGS_ACTIVITY);
    };

    const onLogout = async () => {
        await LocalStorage.clearData("token");
        navigation.navigate(LOGIN_ACTIVITY);
    };

    const left: React.ReactNode[] = [];
    const right: React.ReactNode[] = [];

    const unauthorizedActivities: string[] = ["login", "register", "forgetPassword"];
    if (name !== "settings") {
        right.push(
            <Button transparent onPress={onOpenSettings}>
                <Icon name='settings'/>
            </Button>
        );
    }
    if (name !== "login") {
        left.push(
            <Button transparent onPress={onReturnBack}>
                <Icon name='arrow-back'/>
            </Button>
        );
    }
    if (!unauthorizedActivities.includes(name)) { //TODO check auth token in LocalStorage
        right.push(
            <Button transparent onPress={onLogout}>
                <Icon name='exit'/>
            </Button>
        );
    }

    return (
        <Header style={{backgroundColor: INDIGO}}
                androidStatusBarColor={INDIGO}
        >
            {left.length > 0 ?
                <Left>
                    {left.map(node => {
                        return node;
                    })}
                </Left> : null}
            <Body>
                <Title>{t(`${name}:title`)}</Title>
            </Body>
            {right.length > 0 ?
                <Right>
                    {right.map(node => {
                        return node;
                    })}
                </Right> : null}
        </Header>
    )
}

export default withTranslation()(ActivityHeader);
