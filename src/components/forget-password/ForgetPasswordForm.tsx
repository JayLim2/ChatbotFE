import React, {Component, ReactNode} from "react";
import {withTranslation} from "react-i18next";
import {Platform, StyleSheet, View} from "react-native";
import {Button, Text} from "native-base";
import {Input} from "react-native-elements";
import {INDIGO} from "../../configuration/Constants";
import {MaterialIndicator} from "react-native-indicators";
import ErrorMessage from "../utils/ErrorMessage";

const statusNames: Map<number, string> = new Map();
statusNames.set(-1, "unknown");
statusNames.set(0, "noConnection");
statusNames.set(401, "invalidCredentials");
statusNames.set(404, "notFound");
statusNames.set(500, "internalError");

class ForgetPasswordForm extends Component<any, any> {

    //Component styles
    static styles = StyleSheet.create({
        root: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        },
        container: {
            backgroundColor: '#fff',
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20
        },
        infoBlock: {
            width: "100%",
            textAlignVertical: "center",
            justifyContent: "center",
            padding: 15
        }
    });

    constructor(props: any) {
        super(props);
        this.state = {
            resetInProgress: false,
            resetResponse: null,
            email: ""
        };
        this.onInputEmail = this.onInputEmail.bind(this);
        this.onResetPassword = this.onResetPassword.bind(this);
    }

    onInputEmail(newValue: string) {
        this.setState({
            email: newValue
        })
    }

    onResetPassword() {

    }

    render() {
        const {t} = this.props;
        const {resetInProgress, resetResponse} = this.state;

        //Enable loader if need
        const loader = resetInProgress ?
            <MaterialIndicator color={INDIGO}/> : null;

        //Get authentication result message
        let message: ReactNode = null;
        if (!resetInProgress && resetResponse) {
            const statusCode = resetResponse.status !== undefined ? resetResponse.status : -1;
            const pathToComponent = [404].includes(statusCode) ? "forgetPassword" : "common";
            const pathToMessage = statusNames.get(statusCode);
            message = <ErrorMessage message={t(`${pathToComponent}:messages.${pathToMessage}`)}/>;
        }

        return (
            <View style={ForgetPasswordForm.styles.root}>
                <View style={ForgetPasswordForm.styles.infoBlock}>
                    {message}
                    {loader}
                </View>
                {
                    !resetInProgress &&
                    <View style={ForgetPasswordForm.styles.container}>
                        <Text>{t("forgetPassword:fields.email.label")}</Text>
                        <Input leftIcon={{
                            type: 'material',
                            name: 'email'
                        }}
                               onChangeText={this.onInputEmail}
                        />
                        <Button full
                                onPress={this.onResetPassword}
                                style={{backgroundColor: INDIGO}}
                        >
                            <Text>{t("forgetPassword:buttons.resetButton")}</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }

}

export default withTranslation()(ForgetPasswordForm);
