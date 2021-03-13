export class ErrorHandling {

    public static getStatusAlias(statusCode?: number): string {
        if (statusCode) {
            switch (statusCode) {
                case 0:
                    return "noConnection";
                case 1:
                    return "custom";
                case 401:
                    return "invalidCredentials";
                case 404:
                    return "notFound";
                case 500:
                    return "internalError";
            }
        }
        return "unknown";
    }

}
