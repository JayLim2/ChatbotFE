import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';
import ErrorMessage from "../utils/ErrorMessage";
import {
    FORGET_PASSWORD_ACTIVITY,
    HOME_ACTIVITY,
    INDIGO,
    REGISTER_ACTIVITY,
    WHITE,
} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import {tryLogin} from "../client/Client";
import {withTranslation} from "react-i18next";
import {HttpError} from "../../models/HttpError";
import {User} from "../../models/User";

const statusNames: Map<number, string> = new Map();
statusNames.set(-1, "unknown");
statusNames.set(0, "noConnection");
statusNames.set(401, "invalidCredentials");
statusNames.set(500, "internalError");

type HttpResponseType = 'ok' | 'failed';

class HttpResponse {
    type: HttpResponseType;
    status?: number;

    constructor(type: HttpResponseType,
                status?: number) {

        this.type = type;
        this.status = status;
    }
}

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
        this.onRegister = this.onRegister.bind(this);
        this.onForgetPassword = this.onForgetPassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onInputLogin = this.onInputLogin.bind(this);
        this.onInputPassword = this.onInputPassword.bind(this);
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

    onRegister() {
        this.props.navigation.navigate(REGISTER_ACTIVITY);
    }

    onForgetPassword() {
        this.props.navigation.navigate(FORGET_PASSWORD_ACTIVITY);
    }

    onLogin() {
        const {login, password} = this.state;

        //start authentication
        this.setState({
            authenticating: true,
            authResponse: null
        });

        //validate credentials
        tryLogin(login, password)
            .then((user: User) => {
                this.setState({
                    authenticating: false
                });

                //if authenticated - open "Home" page
                if (user) {
                    this.props.navigation.navigate(HOME_ACTIVITY);
                } else {
                    this.setState({
                        authResponse: new HttpResponse('failed', 401)
                    });
                }

                //hide messages
                const secondsCount = 4;
                setTimeout(() => {
                    this.setState({
                        authResponse: null
                    })
                }, secondsCount * 1000)
            })
            .catch((error: HttpError) => {
                console.error("Error during authentication: ", error);
                this.setState({
                    authenticating: false,
                    authResponse: new HttpResponse('failed', error.status)
                })
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

        const authenticating: boolean = this.state.authenticating;
        const authResponse: HttpResponse = this.state.authResponse;

        const {t} = this.props;

        //Enable loader if need
        const loader = authenticating ?
            <MaterialIndicator color={INDIGO}/> : null;

        //Get authentication result message
        let message = null;
        if (!authenticating && authResponse) {
            const statusCode = authResponse.status !== undefined ? authResponse.status : -1;
            const pathToMessage = statusNames.get(statusCode);
            message = <ErrorMessage message={t(`login:messages.${pathToMessage}`)}/>;
        }

        //Render
        return (
            <View style={LoginForm.styles.root}>
                <View style={LoginForm.styles.infoBlock}>
                    {message}
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
                        <Button full onPress={this.onRegister}
                                style={{
                                    backgroundColor: WHITE,
                                    borderColor: INDIGO,
                                    borderWidth: 2,
                                    marginTop: 10
                                }}
                        >
                            <Text style={{color: INDIGO}}>
                                {t("login:buttons.register")}
                            </Text>
                        </Button>
                        <Text style={{
                            marginTop: 20,
                            color: INDIGO,
                            fontSize: 14,
                            textDecorationLine: "underline",
                            textAlign: "center"
                        }}
                              onPress={this.onForgetPassword}
                        >
                            {t("login:buttons.forgetPassword")}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

// @ts-ignore
export default withTranslation()(LoginForm);
