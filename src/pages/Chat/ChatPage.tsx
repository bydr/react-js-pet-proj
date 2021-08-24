import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import Message from "../../components/Messenger/Messages/Message/Message";
import s from "../../components/Messenger/Messages/Messages.module.css";
import AddMessageForm from "../../components/Messenger/Messages/AddMessageForm/AddMessageForm";
import {TChatMessage} from "../../types/types";
import Avatar from "../../components/common/Avatar/Avatar";
import styles from "./ChatPage.module.css";
import App from "../../App";

const ChatPage: React.FC = () => {
    return <Chat/>;
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const authUserId = useSelector((state: AppStateType) => state.auth.userId);
    console.log("Chat");

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);

    let sendMessageHandler = (message: string) => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
    }

    return <><ChatMessages sendMessage={sendMessageHandler}
                           authUserId={authUserId}/>
    </>;
};

type TPropsChatMessages = {
    sendMessage: (newMessageBody: string) => void,
    authUserId: number | null
};

const ChatMessages: React.FC<TPropsChatMessages>
    = ({ sendMessage, authUserId}) => {

    console.log("ChatMessages");
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const status = useSelector((state: AppStateType) => state.chat.status);

    let messagesElements = messages.map((m, index) =>
        <div className={`${styles.chatMessageItem} ${m.userId === authUserId && styles.currentUser}`}>
            <div className={styles.chatMessageItemInner}>
                <div className={styles.userInfo}>
                    <Avatar path={m.photo}
                            url={`/profile/${m.userId}`}/>
                    <p>{m.userName}</p>
                </div>
                <Message key={index} message={m}/>
            </div>
        </div>
    );

    let addNewMessage = (values: { newMessageBody: string }): void => {
        sendMessage(values.newMessageBody);
    }


    return <div className={s.messages}>
                <div className={s.messagesList}> {messagesElements} </div>
                <AddMessageForm onSubmit={addNewMessage} isDisableSubmit={status !== 'ready'}/>
            </div>
        ;
};


export default ChatPage as React.FC;
