import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from "native-base";
import {INDIGO, SETTINGS_ACTIVITY} from "../../configuration/Constants";
import i18n from "assets/i18nx";
import ForgetPasswordForm from "./ForgetPasswordForm";

class ForgetPasswordActivity extends Component<any, any> {

    constructor(props: Readonly<any>) {
        super(props);
        this.onOpenMenu = this.onOpenMenu.bind(this);
        this.onReturnBack = this.onReturnBack.bind(this);
    }

    onOpenMenu() {
        this.props.navigation.navigate(SETTINGS_ACTIVITY);
    };

    /**
     * Handler for click on "Back" button
     */
    onReturnBack() {
        this.props.navigation.goBack();
    }

    render() {

        return (
            <Container>
                <Header style={{backgroundColor: INDIGO}}
                        androidStatusBarColor={INDIGO}
                >
                    <Left>
                        <Button transparent onPress={this.onReturnBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{i18n.t("forgetPassword:title")}</Title>
                    </Body>
                    <Right>
                        <Button transparent
                                onPress={this.onOpenMenu}
                        >
                            <Icon name='settings'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <ForgetPasswordForm navigation={this.props.navigation} />
                </Content>
            </Container>
        );
    }
}

export default withTranslation()(ForgetPasswordActivity);
