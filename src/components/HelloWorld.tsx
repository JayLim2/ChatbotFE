import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {HELLO_WORLD} from "../configuration/Constants";
import StatefulComponent from "./StatefulComponent";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const HelloWorld = () => {
    return (
        <View style={styles.container}>
            <Text>TEST NEW COMPONENT</Text>
            <Text>{HELLO_WORLD}</Text>
            <StatefulComponent/>
        </View>
    );
}

export default HelloWorld;