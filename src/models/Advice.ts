import {Message} from "./Message";

export class Advice {
    id?: number;
    adviceType?: string;
    mistakeType?: string;
    startPosition?: number;
    endPosition?: number;
    message?: Message;
    content?: any;
}