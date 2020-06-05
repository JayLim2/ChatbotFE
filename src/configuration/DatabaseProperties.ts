//SQLite
import * as SQLite from "expo-sqlite";

export const DB_NAME = "chat_bot";

export const openDatabase = () => {
    return SQLite.openDatabase(
        DB_NAME,
        undefined,
        undefined,
        undefined
    );
}
