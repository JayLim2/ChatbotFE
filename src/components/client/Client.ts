/**
 * Checks credentials on server.
 * @param login
 * @param password
 * @return true - credentials are valid, false - else
 */
import {MESSAGES_API_LINK, USERS_API_LINK} from "../../configuration/ServerProperties";
import {MessageProps} from "../chats/messages/MessageProps";
import {handleResponse} from "../utils/Utils";
import {HttpError} from "../../models/HttpError";
import {encode} from 'base-64'

export const tryLogin = (login: string, password: string) => {
    //Try to validate credentials
    let url = `${USERS_API_LINK}/get`;

    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                "Authorization": `Basic ` + encode(`${login}:${password}`)
            }
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then(isAuthenticated => {
        return isAuthenticated;
    }).catch((error: TypeError | HttpError) => {
        if (error instanceof TypeError) {
            let errorObj: HttpError = new HttpError();
            errorObj.status = 0;
            errorObj.message = 'No connection.';
            throw errorObj;
        }
        throw error;
    });
}

export const getAllMessages = () => {
    let url = `${MESSAGES_API_LINK}/get/all`;

    return fetch(
        url,
        {
            method: 'GET'
        }
    ).then(response => {
        return response.json();
    }).then(messagesJson => {
        return messagesJson;
    });
}

export const saveMessage = (message: MessageProps) => {
    let url = `${MESSAGES_API_LINK}/save`;

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }
    ).then(response => {
        if(response.status !== 200) {
            throw new Error("HTTP ERROR: " + response.status);
        }
        return response.json();
    }).then(serverMessage => {
        return serverMessage;
    }).catch(e => {
        return "CLIENT_FAIL";
    });
}

export const saveAllMessages = (messages: MessageProps[]) => {
    let url = `${MESSAGES_API_LINK}/save/all`;

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages)
        }
    ).then(response => {
        if(response.status !== 200) {
            throw new Error("HTTP ERROR: " + response.status);
        }
        return response.json();
    }).then(serverMessage => {
        return serverMessage;
    }).catch(e => {
        return "CLIENT_FAIL";
    });
}
