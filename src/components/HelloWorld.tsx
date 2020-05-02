import React from 'react';
import {HELLO_WORLD} from "../configuration/Constants";
import StatefulComponent from "./StatefulComponent";
import {
    Container, Header, Title,
    Content, Footer, FooterTab,
    Button, Left, Right,
    Body, Icon, Text
} from 'native-base';

const textContentStyles = {
    marginTop:25,
    marginLeft:15,
    marginBottom:0,
    marginRight:15
}

const HelloWorld = () => {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Login</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Text style={textContentStyles}>
                    TEST NEW COMPONENT
                </Text>
                <Text style={textContentStyles}>
                    {HELLO_WORLD}
                </Text>
                <StatefulComponent/>
            </Content>
            <Footer>
                <FooterTab>
                    <Button full>
                        <Text>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default HelloWorld;
