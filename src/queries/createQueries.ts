export const CREATE_MESSAGES_TABLE: string =
    "CREATE TABLE IF NOT EXISTS messages" +
    "(" +
    "_id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "message TEXT," +
    "userId TEXT," +
    "date DATETIME" +
    ")";
