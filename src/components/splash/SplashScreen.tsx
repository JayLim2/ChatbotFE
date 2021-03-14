import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Body, Container, Content, Header} from "native-base";
import {INDIGO} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";
import {healthCheck} from "../client/Client";
import {ErrorResponse} from "../../models/HttpError";

class SplashScreen extends React.Component<any, any> {

    static styles = StyleSheet.create({
        header: {
            backgroundColor: INDIGO
        },
        flexGrow: {
            flexGrow: 1
        },
        serviceUnavailableContainer: {
            backgroundColor: "red",
            padding: 20
        },
        serviceUnavailableText: {
            textAlign: "center",
            color: "white",
            fontSize: 16
        },
        splashScreen: {
            backgroundColor: INDIGO,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        splashScreenTitle1: {
            color: "white",
            fontSize: 40
        },
        splashScreenTitle2: {
            color: "white"
        }
    })

    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            errorResponse: null
        }

        this.tryConnect = this.tryConnect.bind(this);
    }

    componentDidMount() {
        this.tryConnect();
    }

    tryConnect() {
        healthCheck()
            .then((versions: string) => {
                this.setState({errorResponse: null});
                setTimeout(() => {
                    this.props.navigation.navigate("Login");
                }, 5000);
            })
            .catch((error: ErrorResponse) => {
                this.setState({errorResponse: error});
                setTimeout(() => {
                    this.tryConnect();
                }, 5000);
            });
    }

    render() {
        const {t} = this.props;

        return (
            <Container>
                <Header style={SplashScreen.styles.header}
                        androidStatusBarColor={INDIGO}
                >
                    <Body>
                    </Body>
                </Header>
                <Content contentContainerStyle={SplashScreen.styles.flexGrow}>
                    {this.state.errorResponse ?
                        <View style={SplashScreen.styles.serviceUnavailableContainer}>
                            <Text style={SplashScreen.styles.serviceUnavailableText}>
                                Service is unavailable
                            </Text>
                        </View> : null}
                    <View style={SplashScreen.styles.splashScreen}>
                        <Text style={SplashScreen.styles.splashScreenTitle1}>
                            {t("splash:appTitle")}
                        </Text>
                        <Text style={SplashScreen.styles.splashScreenTitle2}>
                            {'created by Sergei Komarov'}
                        </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default withTranslation()(SplashScreen);
