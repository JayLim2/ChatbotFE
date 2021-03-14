/**
 * Checks credentials on server.
 * @param login
 * @param password
 * @return true - credentials are valid, false - else
 */
import {
    CHATS_API_LINK, CONFIGS_API_LINK,
    HEALTH_CHECK_API_LINK,
    MESSAGES_API_LINK, TOPICS_API_LINK,
    USERS_API_LINK
} from "../../configuration/ServerProperties";
import {handleError, handleResponse} from "../utils/Utils";
import {ErrorResponse, HttpError} from "../../models/HttpError";
import {encode} from 'base-64'
import {Message} from "../../models/Message";
import {Chat} from "../../models/Chat";
import {LocalStorage} from "../utils/Storage";
import {User} from "../../models/User";
import {Topic} from "../../models/Topic";
import {ProfileConfiguration} from "../../models/ProfileConfiguration";

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
    }).then(async (user: User) => {
        await LocalStorage.storeData("token", token);
        await LocalStorage.storeData("userId", String(user.id));
        return user;
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

export const healthCheck = () => {
    const url = `${HEALTH_CHECK_API_LINK}/version`;

    return fetch(
        url, {method: 'GET'}
    ).then((response: Response) => {
        return handleResponse(response, url, true);
    }).then((versions: string) => {
        return versions;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const getChatMessages = async (chatId: number) => {
    const url = `${MESSAGES_API_LINK}/get/chat`;
    const token = await LocalStorage.getData("token");

    const chat: Chat = new Chat();
    chat.id = chatId;

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(chat)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((messages: Message[]) => {
        return messages;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const registerUser = (login: string, password: string,
                             repeatPassword: string, email: string) => {

    const url = `${USERS_API_LINK}/register`;

    let httpError: HttpError;

    if (!login || login.trim() === "") {
        httpError = new HttpError();
        httpError.status = 1;
        httpError.message = "emptyLogin";
        throw httpError;
    }

    if (!password || password.trim() === "") {
        httpError = new HttpError();
        httpError.status = 1;
        httpError.message = "emptyPassword";
        throw httpError;
    }

    if (!repeatPassword || repeatPassword.trim() === "") {
        httpError = new HttpError();
        httpError.status = 1;
        httpError.message = "emptyRepeatPassword";
        throw httpError;
    }

    if (password !== repeatPassword) {
        httpError = new HttpError();
        httpError.status = 1;
        httpError.message = "passwordsMismatch";
        throw httpError;
    }

    if (!email || email.trim() === "") {
        httpError = new HttpError();
        httpError.status = 1;
        httpError.message = "emptyEmail";
        throw httpError;
    }

    const user: User = new User();
    user.login = login;
    user.passwordHash = password;
    user.email = email;

    const token = getAuthorizationToken(login, password);

    return fetch(
        url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then(async (registeredUser: User) => {
        if (registeredUser.id) {
            await LocalStorage.storeData("token", token);
        }
        return registeredUser;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const getTopics = async () => {
    const url = `${TOPICS_API_LINK}/get/all`;
    const token = await LocalStorage.getData("token");

    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            }
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((topics: Topic[]) => {
        return topics;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const getCurrentUserConfig = async () => {
    const url = `${CONFIGS_API_LINK}/get/user`;
    const token = await LocalStorage.getData("token");
    const userId = await LocalStorage.getData("userId");

    let user: User = new User();
    user.id = Number(userId);

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(user)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((config: ProfileConfiguration) => {
        return config;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const saveCurrentUserConfig = async (topics: Topic[], langLevel: any, currentConfigId?: number) => {
    const url = `${CONFIGS_API_LINK}/save`;
    const token = await LocalStorage.getData("token");
    const userId = await LocalStorage.getData("userId");

    let user: User = new User();
    user.id = Number(userId);

    let config: ProfileConfiguration = new ProfileConfiguration();
    if (currentConfigId) {
        config.id = currentConfigId;
    }
    config.preferredTopics = topics;
    config.owner = user;
    config.languageSkillsConfig = {
        selectedLanguageLevel: langLevel,
        settings: {}
    }

    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(config)
        }
    ).then((response: Response) => {
        return handleResponse(response, url);
    }).then((config: ProfileConfiguration) => {
        return config;
    }).catch((error: any) => {
        throw handleError(error);
    })
}

export const logout = async () => {
    const url = `${USERS_API_LINK}/logout`;
    const token = await LocalStorage.getData("token");
    const userId = await LocalStorage.getData("userId");

    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            }
        }
    ).then((response: Response) => {
        return handleResponse(response, url, true);
    }).then(() => {
        return;
    }).catch((error: any) => {
        throw handleError(error);
    })
}
