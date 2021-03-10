import {User} from "./User";
import {Chat} from "./Chat";
import {Advice} from "./Advice";

export class Message {
    id?: number;
    message?: string;
    user?: User;
    dateTime?: string;
    chat?: Chat;
    advices?: Array<Advice>;
}