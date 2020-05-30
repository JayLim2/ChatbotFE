/**
 * Checks credentials on server.
 * @param login
 * @param password
 * @return true - credentials are valid, false - else
 */
import {USERS_API_LINK} from "../../configuration/ServerProperties";

export const tryLogin = (login: string, password: string) => {
    //Put data into form
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);

    //Try to validate credentials
    let url = `${USERS_API_LINK}/validate/credentials`;

    return fetch(
        url,
        {
            method: 'POST',
            body: formData
        }
    ).then(response => {
        return response.json();
    }).then(isAuthenticated => {
        return isAuthenticated;
    }).catch(e => {
        console.error("ERROR");
        return false;
    });
}
