import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import {Input} from 'react-native-elements';
import {Dimensions} from "react-native";
import {MaterialIndicator} from 'react-native-indicators';

import ErrorMessage from "../utils/ErrorMessage";
import SuccessMessage from "../utils/SuccessMessage";
import Orientation from "../utils/Orientation";

import {
    AUTHENTICATED_SUCCESSFUL,
    INVALID_CREDENTIALS, LOGIN,
    LOGIN_BUTTON,
    LOGIN_INPUT_LABEL,
    LOGIN_INPUT_PLACEHOLDER, PASSWORD,
    PASSWORD_INPUT_LABEL,
    PASSWORD_INPUT_PLACEHOLDER
} from "../../configuration/Constants";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        this.fetchFonts = this.fetchFonts.bind(this);
    }

    fetchFonts() {
        return Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }

    onLogin() {
        const {login, password} = this.state;

        //start authentication
        this.setState({
            authenticating: true
        })

        //validate credentials
        setTimeout(
            () => {
                let credentialsAreValid = false;
                if(login && password) {
                    credentialsAreValid = login === LOGIN && password === PASSWORD;
                }
                this.setState({
                    authenticating: false,
                    authenticated: credentialsAreValid,
                    authenticationResponseReceived: true
                })

                if(credentialsAreValid) {
                    this.props.navigation.navigate("ChatsList");
                }
            },
            1500
        )

        //hide messages
        setTimeout(
            () => {
                this.setState({
                    authenticationResponseReceived: false
                })
            },
            3500
        )
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
                startAsync={this.fetchFonts}
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
            <MaterialIndicator color='indigo' /> : null;

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
                        <Button full onPress={this.onLogin} style={{backgroundColor:"indigo"}}>
                            <Text>{LOGIN_BUTTON}</Text>
                        </Button>
                    </View>
                }
            </View>
        )
    }
}

export default LoginForm;
