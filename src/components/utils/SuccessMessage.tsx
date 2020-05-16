import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import React from "react";

const SuccessMessage = ({message}: { message: any }) => {

    const styles = StyleSheet.create({
        messageContainer: {
            padding:20,
            borderWidth:1,
            borderColor:"#00AD12",
            backgroundColor:"#e1ffc3"
        }
    })

    return (
        <View style={styles.messageContainer}>
            <Text style={{color:"#00AD12"}}>{message}</Text>
        </View>
    );
}

export default SuccessMessage;
