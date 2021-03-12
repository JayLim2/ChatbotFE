import {Message} from "../components/chats/messages/Message";

const INSERT_MESSAGE_VALUES_PART = "(?, ?, ?, ?)";

const INSERT_MESSAGES =
    "INSERT INTO " +
    "messages (_id, message, userId, date) " +
    "VALUES ";

export const insertMessagesQuery = (messages: Message[]) => {
    if(!messages || messages.length === 0) {
        return {
            query: null,
            queryArgs: null
        };
    }

    let result: InsertMessageQuery = {
        query: INSERT_MESSAGES,
        queryArgs: []
    }

    let count = messages.length;
    for (let i = 0; i < count; i++) {
        let message = messages[i];
        result.query += (i == 0 ? '' : ',') + INSERT_MESSAGE_VALUES_PART;
        console.log(`\t${message.id}`)
        result.queryArgs?.push(
            message.id,
            message.message,
            message.userId,
            message.date
        );
    }

    return result;
};
