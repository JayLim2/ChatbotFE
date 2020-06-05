import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from "native-base";
import {EN_LANG, RU_LANG} from "../../configuration/files/Images";
import {fetchFonts} from "../../configuration/Fonts";

class SettingsActivity extends Component<any, any> {

    constructor(props: object) {
        super(props);
        this.state = {
            isLoadingComplete: false,
        }
        this.onReturnBack = this.onReturnBack.bind(this);
        this.onSelectEnglishLanguage = this.onSelectEnglishLanguage.bind(this);
        this.onSelectRussianLanguage = this.onSelectRussianLanguage.bind(this);
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
        if (!this.state.isLoadingComplete) {
            return null;
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
