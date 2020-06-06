import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from "native-base";
import images from "assets/images";
import i18n from "assets/i18nx";
import {fetchFonts} from "../../configuration/Fonts";
import {INDIGO} from "../../configuration/Constants";
import {withTranslation} from "react-i18next";

class SettingsActivity extends Component<any, any> {

    static styles = StyleSheet.create({
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
    });

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

    /**
     * Handles click by "Return back" button
     */
    onReturnBack() {
        this.props.navigation.goBack();
    }

    /**
     * Handles clicking by "English language" button
     *
     * TODO: add functionality of changing language to English
     */
    onSelectEnglishLanguage() {
        i18n.changeLanguage("en");
    }

    /**
     * Handles clicking by "English language" button
     *
     * TODO: add functionality of changing language to Russian
     */
    onSelectRussianLanguage() {
        i18n.changeLanguage("ru");
    }

    render(): React.ReactNode {
        if (!this.state.isLoadingComplete) {
            return null;
        }
        const {t} = this.props;

        return (
            <Container>
                <Header style={{backgroundColor: INDIGO}}
                        androidStatusBarColor={INDIGO}
                >
                    <Left>
                        <Button transparent onPress={this.onReturnBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{t("settings:title")}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <View style={SettingsActivity.styles.root}>
                        <Text style={SettingsActivity.styles.text}>{t("settings:buttons.changeLanguageTittle")}</Text>
                        <View style={SettingsActivity.styles.languages}>
                            <Button transparent onPress={this.onSelectRussianLanguage}>
                                <Image style={SettingsActivity.styles.languageIcon} source={images.languages.ru} />
                            </Button>
                            <Button transparent onPress={this.onSelectEnglishLanguage}>
                                <Image style={SettingsActivity.styles.languageIcon} source={images.languages.en} />
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }

}

export default withTranslation()(SettingsActivity);
