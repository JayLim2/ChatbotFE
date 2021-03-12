import {Message} from "../../models/Message";

export interface ChatProps {
    messages: Message[],
    navigation: any
}

export interface ChatPageProps {
    chatId: number
}
