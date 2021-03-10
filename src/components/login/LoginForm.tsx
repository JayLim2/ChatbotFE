import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";

import {
    HOME_ACTIVITY, INDIGO,
    NO_CONNECTION,
} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import {tryLogin} from "../client/Client";
import {withTranslation} from "react-i18next";
import {HttpError} from "../../models/HttpError";

class LoginForm extends Component<any, any> {

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

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            login: "",
            password: "",
            authenticating: false,
            authenticationResponseReceived: false,
            authenticated: false,
            noConnection: false
        }

        //event handlers
        this.onLogin = this.onLogin.bind(this);
        this.onInputLogin = this.onInputLogin.bind(this);
        this.onInputPassword = this.onInputPassword.bind(this);

        //other methods
        this.setAuthenticationFlags = this.setAuthenticationFlags.bind(this);
    }

    async componentDidMount() {
        try {
            await fetchFonts();
        } catch (e) {
            console.warn(e);
        } finally {
            this.setState({
                isLoadingComplete: true
            });
        }
    }

    /**
     * Set authentication flags
     *
     * @param noConnection - if no connection or other network troubles -> true, else -> false
     * @param authenticating - response not received -> true, else -> false
     * @param authenticated - credentials are valid -> true, else -> false
     * @param authenticationResponseReceived - response received -> true, else -> false
     * TODO: maybe merge flags 'authenticating' and 'authenticationResponseReceived'?
     */
    setAuthenticationFlags(noConnection: boolean,
                           authenticating: boolean,
                           authenticated: boolean,
                           authenticationResponseReceived: boolean) {

        this.setState({
            noConnection: noConnection,
            authenticating: authenticating,
            authenticated: authenticated,
            authenticationResponseReceived: authenticationResponseReceived
        })
    }

    onLogin() {
        const {login, password} = this.state;

        //start authentication
        this.setState({
            authenticating: true
        })

        //validate credentials
        tryLogin(login, password)
            .then(validationResponse => {
                //check connection
                let noConnection =
                    typeof validationResponse === 'string'
                    && validationResponse === NO_CONNECTION;

                //if no connection
                if (noConnection) {
                    this.setAuthenticationFlags(
                        true, false, false, true
                    );
                    return;
                }

                //if connection there
                this.setAuthenticationFlags(
                    false, false, validationResponse, true
                );

                //if authenticated - open "Home" page
                if (validationResponse) {
                    this.props.navigation.navigate(HOME_ACTIVITY);
                }

                //hide messages
                let secondsCount = 4;
                setTimeout(
                    () => {
                        this.setState({
                            authenticationResponseReceived: false
                        })
                    },
                    secondsCount * 1000
                )
            })
            .catch((error: HttpError) => {
                console.error("Error during authentication: ", error);
                this.setAuthenticationFlags(
                    false, false, false, true
                );
            })
    }

    /**
     * Handles change of login form field "Login":
     * - Set new value into state.
     * @param newValue
     */
    onInputLogin(newValue: string) {
        this.setState({
            login: newValue
        })
    }

    /**
     * Handles change of login form field "Password":
     * - Set new value into state.
     * @param newValue
     */
    onInputPassword(newValue: string) {
        this.setState({
            password: newValue
        })
    }

    render() {
        if (!this.state.isLoadingComplete) {
            return null;
        }

        const {
            noConnection,
            authenticating,
            authenticationResponseReceived,
            authenticated
        } = this.state;

        const {t} = this.props;

        //Enable loader if need
        const loader = authenticating ?
            <MaterialIndicator color={INDIGO}/> : null;

        //Get authentication result message
        const message = noConnection ?
            <ErrorMessage message={t("login:messages.noConnection")}/> :
            (authenticated ?
                <SuccessMessage message={t("login:messages.wait")}/> :
                <ErrorMessage message={t("login:messages.invalidCredentials")}/>);

        //Render
        return (
            <View style={LoginForm.styles.root}>
                <View style={LoginForm.styles.infoBlock}>
                    {authenticationResponseReceived ? message : null}
                    {loader}
                </View>
                {
                    !authenticating &&
                    <View style={LoginForm.styles.container}>
                        <Text>{t("login:fields.login.label")}</Text>
                        <Input placeholder={t("login:fields.login.placeholder")}
                               leftIcon={{
                                   type: 'font-awesome',
                                   name: 'user'
                               }}
                               onChangeText={this.onInputLogin}
                        />
                        <Text>{t("login:fields.password.label")}</Text>
                        <Input placeholder={t("login:fields.password.placeholder")}
                               leftIcon={{
                                   type: 'font-awesome',
                                   name: 'lock'
                               }}
                               secureTextEntry={true}
                               onChangeText={this.onInputPassword}
                        />
                        <Button full onPress={this.onLogin}
                                style={{backgroundColor: INDIGO}}
                        >
                            <Text>{t("login:buttons.signIn")}</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }
}

// @ts-ignore
export default withTranslation()(LoginForm);
