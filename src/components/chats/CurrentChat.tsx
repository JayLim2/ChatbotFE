import React from 'react';
import {ScrollView} from 'react-native';
import SystemMessage from "./messages/SystemMessage";
import UserMessage from "./messages/UserMessage";
import {ChatProps} from "./ChatProps";

class CurrentChat extends React.Component<any, any> {

    //References to components
    private scrollView: ScrollView | null = null;

    constructor(props: ChatProps) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.scrollView?.scrollToEnd({animated:true});
        }, 50);
    }

    render(): React.ReactNode {
        const {messages} = this.props;
        let messagesItems: React.ReactNode[] = [];
        if (messages) {
            let k: number = 0;
            for (const message of messages) {
                messagesItems.push(
                    message.userId !== "USER" ?
                        <SystemMessage key={++k}
                                       message={message.message}
                                       date={message.date}
                                       userId={message.userId}
                        /> :
                        <UserMessage key={++k}
                                     message={message.message}
                                     date={message.date}
                                     userId={message.userId}
                        />
                );
            }
        }

        return (
            <ScrollView
                ref={ref => this.scrollView = ref}
                style={{paddingTop: 10}}
            >
                {messagesItems}
            </ScrollView>
        );
    }

}

export default CurrentChat;
