import moment, {Moment} from "moment";
import {ErrorResponse, HttpError} from "../../models/HttpError";

export const DATE_TIME_PATTERN = "DD.MM.YYYY HH:mm:ss";

export const getCurrentDate = () => {
    let date: Moment = moment();
    return date.format(DATE_TIME_PATTERN);
}

export const handleResponse = (response: Response, url?: string, noJson: boolean = false): Promise<any> | never => {
    if (response.ok) {
        return noJson ? response.text() : response.json();
    } else {
        const errorTexts: {[index: number]: string} = {
            400: `Bad request`,
            401: `Invalid login or password.`,
            403: `Access denied.`,
            404: `URL = '${url}' doesn't exists.`,
            500: `Internal server error.`
        };
        let errorText = errorTexts[response.status] ?
            errorTexts[response.status] : `Unknown error.`;
        let errorObj: HttpError = new HttpError();
        errorObj.status = response.status;
        errorObj.message = errorText;
        throw errorObj;
    }
}

export const handleError = (error: ErrorResponse) => {
    if (error instanceof TypeError) {
        let httpError: HttpError = new HttpError();
        httpError.status = 0;
        httpError.message = 'No connection.';
        throw httpError;
    }
    throw error;
}
