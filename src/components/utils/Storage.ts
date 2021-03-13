import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {

    public static async storeData(key: string, value: string): Promise<any> {
        try {
            return AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error("Async storing error: ", e);
        }
    }

    public static async getData(key: string): Promise<any> {
        try {
            return AsyncStorage.getItem(key);
        } catch (e) {
            console.error("Async getting from store error: ", e);
        }
    }

    public static async clearData(key: string): Promise<any> {
        try {
            return AsyncStorage.removeItem(key);
        } catch (e) {
            console.error("Async removing from store error: ", e);
        }
    }

}
