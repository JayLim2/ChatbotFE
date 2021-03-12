/**
 * Checks credentials on server.
 * @param login
 * @param password
 * @return true - credentials are valid, false - else
 */
import {CHATS_API_LINK, MESSAGES_API_LINK, USERS_API_LINK} from "../../configuration/ServerProperties";
import {handleError, handleResponse} from "../utils/Utils";
import {ErrorResponse, HttpError} from "../../models/HttpError";
import {encode} from 'base-64'
import {Message} from "../../models/Message";
import {Chat} from "../../models/Chat";
import {LocalStorage} from "../utils/Storage";

const getAuthorizationToken = (login: string, password: string) => {
    return encode(`${login}:${password}`);
}

const getAuthorizationHeader = (token: string) => {
    return {
        "Authorization": `Basic ${token}`
    }
}

export const tryLogin = (login: string, password: string) => {
    //Try to validate credentials
    const url = `${USERS_API_LINK}/get`;
    const token = getAuthorizationToken(login, password);

    return fetch(
        url,
        {
            method: 'GET',
            headers: getAuthorizationHeader(token)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then(async (isAuthenticated) => {
        await LocalStorage.storeData("token", token);
        return isAuthenticated;
    }).catch((error: ErrorResponse) => {
        throw handleError(error);
    });
}

export const getAllMessages = async () => { //TODO fixme
    const url = `${MESSAGES_API_LINK}/get/all`;
    const token = await LocalStorage.getData("token");

    return fetch(
        url,
        {
            method: 'GET',
            headers: getAuthorizationHeader(token)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((messages: Message[]) => {
        return messages;
    }).catch((error: ErrorResponse) => {
        throw handleError(error);
    });
}

export const saveMessage = async (message: Message) => {
    const url = `${MESSAGES_API_LINK}/save`;
    const token = await LocalStorage.getData("token");

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(message)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then(serverMessage => {
        return serverMessage;
    }).catch((error: ErrorResponse) => {
        throw handleError(error);
    });
}

export const saveAllMessages = async (messages: Message[]) => {
    const url = `${MESSAGES_API_LINK}/save/all`;
    const token = await LocalStorage.getData("token");

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(messages)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then(serverMessage => {
        return serverMessage;
    }).catch((error: ErrorResponse) => {
        throw handleError(error);
    });
}

export const getCurrentUserChats = async () => {
    const url = `${CHATS_API_LINK}/loadChatsForCurrentUser`;
    const token = await LocalStorage.getData("token");

    return fetch(
        url,
        {
            method: 'GET',
            headers: getAuthorizationHeader(token)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((chats: Chat[]) => {
        return chats;
    }).catch((error: ErrorResponse) => {
        throw handleError(error);
    })
}
