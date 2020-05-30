import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import {AppLoading} from "expo";
import {Input} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";

import {
    AUTHENTICATED_SUCCESSFUL,
    HOME_ACTIVITY,
    INVALID_CREDENTIALS,
    LOGIN_BUTTON,
    LOGIN_INPUT_LABEL,
    LOGIN_INPUT_PLACEHOLDER,
    PASSWORD_INPUT_LABEL,
    PASSWORD_INPUT_PLACEHOLDER
} from "../../configuration/Constants";
import {fetchFonts} from "../../configuration/Fonts";
import {tryLogin} from "../client/Client";

class LoginForm extends Component<any, any> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            loading: true,
            login: "",
            password: "",
            authenticating: false,
            authenticationResponseReceived: false,
            authenticated: false
        }
        this.onLogin = this.onLogin.bind(this);
        this.onInputLogin = this.onInputLogin.bind(this);
        this.onInputPassword = this.onInputPassword.bind(this);
    }

    onLogin() {
        const {login, password} = this.state;

        //start authentication
        this.setState({
            authenticating: true
        })

        //validate credentials
        tryLogin(login, password)
            .then(credentialsAreValid => {
                this.setState({
                    authenticating: false,
                    authenticated: credentialsAreValid,
                    authenticationResponseReceived: true
                })

                if (credentialsAreValid) { //if authenticated - open "Home" page
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
            .catch(e => {
                console.error("Error during authentication: ", e);
                this.setState({
                    authenticating: false,
                    authenticated: false,
                    authenticationResponseReceived: true
                })
            })
    }

    // @ts-ignore
    onInputLogin(newValue) {
        this.setState({
            login: newValue
        })
    }

    // @ts-ignore
    onInputPassword(newValue) {
        this.setState({
            password: newValue
        })
    }

    render() {
        if (this.state.loading) {
            return <AppLoading
                startAsync={fetchFonts}
                onFinish={() => this.setState({loading: false})}
                onError={e => console.error(e)}
            />;
        }

        const styles = StyleSheet.create({
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

        const {authenticating, authenticationResponseReceived, authenticated} = this.state;

        const loader = authenticating ?
            <MaterialIndicator color='indigo'/> : null;

        const message = authenticated ?
            <SuccessMessage message={AUTHENTICATED_SUCCESSFUL}/> :
            <ErrorMessage message={INVALID_CREDENTIALS}/>;

        return (
            <View style={styles.root}>
                <View style={styles.infoBlock}>
                    {authenticationResponseReceived ? message : null}
                    {loader}
                </View>
                {
                    !authenticating &&
                    <View style={styles.container}>
                        <Text>{LOGIN_INPUT_LABEL}</Text>
                        <Input placeholder={LOGIN_INPUT_PLACEHOLDER}
                               leftIcon={{
                                   type: 'font-awesome',
                                   name: 'user'
                               }}
                               onChangeText={this.onInputLogin}
                        />
                        <Text>{PASSWORD_INPUT_LABEL}</Text>
                        <Input placeholder={PASSWORD_INPUT_PLACEHOLDER}
                               leftIcon={{
                                   type: 'font-awesome',
                                   name: 'lock'
                               }}
                               secureTextEntry={true}
                               onChangeText={this.onInputPassword}
                        />
                        <Button full onPress={this.onLogin} style={{backgroundColor: "indigo"}}>
                            <Text>{LOGIN_BUTTON}</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }
}

export default LoginForm;
