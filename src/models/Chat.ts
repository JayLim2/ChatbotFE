import {Message} from "./Message";
import {User} from "./User";

export class Chat {
    id?: number;
    messages?: Array<Message>;
    owner?: User;
}