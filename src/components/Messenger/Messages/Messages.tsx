import s from "./Messages.module.css"
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import React from "react";
import {MessageType} from "../../../types/types";

type PropsType = {
    messages: Array<MessageType>,
    sendMessage: (newMessageBody: string) => void
};

const Messages: React.FC<PropsType> = (props) => {
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m}/>);

    let addNewMessage = (values: { newMessageBody: string }): void => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.messages}>
            <div className={s.messagesList}> {messagesElements} </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    );
};

export default Messages;
