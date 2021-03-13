import {Chat} from "./Chat";

export class User {
    id?: number;
    login?: string;
    passwordHash?: string;
    role?: string;
    email?: string;
    chats?: Array<Chat>;
}
