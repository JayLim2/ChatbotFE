import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";

export const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    });
}
