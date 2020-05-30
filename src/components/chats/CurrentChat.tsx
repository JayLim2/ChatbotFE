import React from 'react';
import {ScrollView} from 'react-native';
import SystemMessage from "./messages/SystemMessage";
import UserMessage from "./messages/UserMessage";
import {ChatProps} from "./ChatProps";

class CurrentChat extends React.Component<any, any> {

    constructor(props: ChatProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {messages} = this.props;
        let messagesItems: React.ReactNode[] = [];
        if (messages) {
            let k: number = 0;
            for (const message of messages) {
                messagesItems.push(
                    message.type === "SYSTEM" ?
                        <SystemMessage key={++k} message={message.message} date={message.date} username={message.username} /> :
                        <UserMessage key={++k} message={message.message} date={message.date} username={message.username} />
                );
            }
        }

        return (
            <ScrollView style={{paddingTop: 10}}>
                {messagesItems}
            </ScrollView>
        );
    }

}

export default CurrentChat;
