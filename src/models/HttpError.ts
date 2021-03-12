export class HttpError {
    status?: number;
    message?: string;
}

export type ErrorResponse = TypeError | HttpError;
