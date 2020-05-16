import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import React from "react";

const ErrorMessage = ({message}: { message: any }) => {

    const styles = StyleSheet.create({
        messageContainer: {
            padding:20,
            borderWidth:1,
            borderColor:"#AD0C00",
            backgroundColor:"#FFD6D6"
        }
    })

    return (
        <View style={styles.messageContainer}>
            <Text style={{color:"#AD0C00"}}>{message}</Text>
        </View>
    );
}

export default ErrorMessage;
