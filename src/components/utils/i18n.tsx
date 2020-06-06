import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import languages from "assets/languages";

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: 'en',
        ns: ["login", "settings", "chatsList", "chat"],
        resources: languages,
        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        },
    });

export default i18n;