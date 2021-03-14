import {Message} from "./Message";

export class Advice {
    id: number;
    adviceType: string;
    mistakeType: string;
    startPosition: number;
    endPosition: number;
    message: Message;
    comment: string;
    customData: CustomAdviceData;

    constructor(id: number, adviceType: string, mistakeType: string, startPosition: number, endPosition: number, message: Message, comment: string, customData: CustomAdviceData) {
        this.id = id;
        this.adviceType = adviceType;
        this.mistakeType = mistakeType;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.message = message;
        this.comment = comment;
        this.customData = customData;
    }
}

interface CustomAdviceParsingProtocol {
    resolveIntersection: "merge" | "priority",
    margePolicy?: {
        styles: {
            underlineColor?: string,
            fontColor?: string,
            backgroundColor?: string
        }
    }
}

export class CustomAdviceData {
    protocol: CustomAdviceParsingProtocol;
    data: Advice[] = [];

    constructor(protocol: CustomAdviceParsingProtocol, data: Advice[]) {
        this.protocol = protocol;
        this.data = data;
    }
}
