import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Container, Header, Left, Body, Right, Content, Footer, Title, Icon, Button} from "native-base";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {EN_LANG, RU_LANG} from "../../configuration/Images";

class SettingsActivity extends Component<any, any> {

    constructor(props: object) {
        super(props);
        this.state = {
            loading: true
        }
        this.fetchFonts = this.fetchFonts.bind(this);
        this.onReturnBack = this.onReturnBack.bind(this);
        this.onSelectEnglishLanguage = this.onSelectEnglishLanguage.bind(this);
        this.onSelectRussianLanguage = this.onSelectRussianLanguage.bind(this);
    }

    fetchFonts() {
        return Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }

    onReturnBack() {
        this.props.navigation.goBack();
    }

    onSelectEnglishLanguage() {
        console.log("English");
    }

    onSelectRussianLanguage() {
        console.log("Russian");
    }

    render(): React.ReactNode {
        if (this.state.loading) {
            return <AppLoading
                startAsync={this.fetchFonts}
                onFinish={() => this.setState({loading: false})}
                onError={e => console.error(e)}
            />;
        }

        const styles = StyleSheet.create({
            root: {
                padding: 20,
                paddingTop: "5%",
                alignItems: "center"
            },
            text: {
                fontSize: 18
            },
            languages: {
                flex: 1,
                flexDirection: "row",
                marginTop: 20
            },
            languageIcon: {
                marginRight: 15
            }
        })

        return (
            <Container>
                <Header style={{backgroundColor: "indigo"}} androidStatusBarColor={"indigo"}>
                    <Left>
                        <Button transparent onPress={this.onReturnBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.root}>
                        <Text style={styles.text}>Select language:</Text>
                        <View style={styles.languages}>
                            <Button transparent onPress={this.onSelectRussianLanguage}>
                                <Image style={styles.languageIcon} source={RU_LANG} />
                            </Button>
                            <Button transparent onPress={this.onSelectEnglishLanguage}>
                                <Image style={styles.languageIcon} source={EN_LANG} />
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }

}

export default SettingsActivity;
