import React, {Component} from "react";
import {Text, View} from "react-native";
import {Container, Header, Left, Body, Right, Content, Footer, Title, Icon, Button} from "native-base";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";

class SettingsActivity extends Component<any, any> {

    constructor(props: object) {
        super(props);
        this.state = {
            loading: true
        }
        this.fetchFonts = this.fetchFonts.bind(this);
        this.onReturnBack = this.onReturnBack.bind(this);
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

    render(): React.ReactNode {
        if (this.state.loading) {
            return <AppLoading
                startAsync={this.fetchFonts}
                onFinish={() => this.setState({loading: false})}
                onError={e => console.error(e)}
            />;
        }

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
                </Header>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <View>
                        <Text>Coming soon.</Text>
                    </View>
                </Content>
            </Container>
        )
    }

}

export default SettingsActivity;
