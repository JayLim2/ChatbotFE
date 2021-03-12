import {Text, View} from "react-native";
import React from "react";
import {Body, Container, Content, Header} from "native-base";
import {INDIGO} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";
import {healthCheck} from "../client/Client";
import {ErrorResponse} from "../../models/HttpError";

class SplashScreen extends React.Component<any, any> {

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
                <Header style={{backgroundColor: INDIGO}}
                        androidStatusBarColor={INDIGO}
                >
                    <Body>
                    </Body>
                </Header>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    {this.state.errorResponse ?
                        <View style={{
                            backgroundColor: "red",
                            padding: 20
                        }}>
                            <Text style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: 16
                            }}>
                                Service is unavailable
                            </Text>
                        </View> : null}
                    <View style={{
                        backgroundColor: "indigo",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 40
                        }}>
                            {t("splash:appTitle")}
                        </Text>
                        <Text style={{
                            color: "white"
                        }}>
                            {'created by Sergei Komarov'}
                        </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default withTranslation()(SplashScreen);
