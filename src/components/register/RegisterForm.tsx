import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Platform, StyleSheet, View} from "react-native";
import {MaterialIndicator} from "react-native-indicators";
import {INDIGO, LOGIN_ACTIVITY} from "../../configuration/Constants";
import ErrorMessage from "../utils/ErrorMessage";
import {Button, Text} from "native-base";
import {Input} from "react-native-elements";
import {registerUser} from "../client/Client";
import {User} from "../../models/User";
import {ErrorHandling} from "../utils/ErrorHandlingConfigs";

class RegisterForm extends Component<any, any> {

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

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            registerInProgress: false,
            registerResponse: null,
            login: "",
            password: "",
            repeatPassword: "",
            email: ""
        };
        this.onInputLogin = this.onInputLogin.bind(this);
        this.onInputPassword = this.onInputPassword.bind(this);
        this.onInputRepeatPassword = this.onInputRepeatPassword.bind(this);
        this.onInputEmail = this.onInputEmail.bind(this);
        this.onRegister = this.onRegister.bind(this);
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

    onInputRepeatPassword(newValue: string) {
        this.setState({
            repeatPassword: newValue
        })
    }

    onInputEmail(newValue: string) {
        this.setState({
            email: newValue
        })
    }

    async onRegister() {
        const {login, password, repeatPassword, email} = this.state;

        this.setState({
            registerInProgress: true,
            registerResponse: null
        });
        try {
            const registeredUser: User = await registerUser(login, password, repeatPassword, email);
            if (registeredUser.id) {
                this.setState({
                    registerInProgress: false,
                    registerResponse: null
                });
                this.props.navigation.navigate(LOGIN_ACTIVITY);
            } else {
                this.setState({
                    registerInProgress: false,
                    registerResponse: {
                        status: 1,
                        message: "alreadyExists"
                    }
                });
            }
        } catch (error) {
            this.setState({
                registerInProgress: false,
                registerResponse: error
            });
        }
    }

    render() {
        const {t} = this.props;
        const {registerInProgress, registerResponse} = this.state;

        //Enable loader if need
        const loader = registerInProgress ?
            <MaterialIndicator color={INDIGO}/> : null;

        //Get authentication result message
        let message = null;
        if (!registerInProgress && registerResponse) {
            const statusAlias = ErrorHandling.getStatusAlias(registerResponse.status);
            const isCustomStatus: boolean = statusAlias === "custom";
            const pathToComponent = isCustomStatus ? "register" : "common";
            const pathToMessage = isCustomStatus ? registerResponse.message : statusAlias;
            message = <ErrorMessage message={t(`${pathToComponent}:messages.${pathToMessage}`)}/>;
        }

        return (
            <View style={RegisterForm.styles.root}>
                <View style={RegisterForm.styles.infoBlock}>
                    {message}
                    {loader}
                </View>
                {
                    !registerInProgress &&
                    <View style={RegisterForm.styles.container}>
                        <Text>{t("register:fields.login.label")}</Text>
                        <Input leftIcon={{
                            type: 'font-awesome',
                            name: 'user'
                        }}
                               onChangeText={this.onInputLogin}
                               defaultValue={this.state.login}
                        />
                        <Text>{t("register:fields.password.label")}</Text>
                        <Input leftIcon={{
                            type: 'material',
                            name: 'lock'
                        }}
                               secureTextEntry={true}
                               onChangeText={this.onInputPassword}
                               defaultValue={this.state.password}
                        />
                        <Text>{t("register:fields.repeatPassword.label")}</Text>
                        <Input leftIcon={{
                            type: 'material',
                            name: 'lock'
                        }}
                               secureTextEntry={true}
                               onChangeText={this.onInputRepeatPassword}
                               defaultValue={this.state.repeatPassword}
                        />
                        <Text>{t("register:fields.email.label")}</Text>
                        <Input leftIcon={{
                            type: 'material',
                            name: 'email'
                        }}
                               onChangeText={this.onInputEmail}
                               defaultValue={this.state.email}
                        />
                        <Button full
                                onPress={this.onRegister}
                                style={{backgroundColor: INDIGO}}
                        >
                            <Text>{t("register:buttons.registerButton")}</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }
}

export default withTranslation()(RegisterForm);
