import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import Message from "../../components/Messenger/Messages/Message/Message";
import s from "../../components/Messenger/Messages/Messages.module.css";
import AddMessageForm from "../../components/Messenger/Messages/AddMessageForm/AddMessageForm";
import {TChatMessage} from "../../types/types";
import Avatar from "../../components/common/Avatar/Avatar";
import styles from "./ChatPage.module.css";

type TReadyStatus = 'pending' | 'ready';

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage: React.FC = () => {
    return <Chat/>;
};

const Chat: React.FC = () => {
    let [readyStatus, setReadyStatus] = useState<TReadyStatus>('pending');
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch();
    const authUserId = useSelector((state: AppStateType) => state.auth.userId);

    useEffect(() => {
        ws.addEventListener("open", () => {
            setReadyStatus("ready");
        });
    },[]);

    useEffect(() => {
        ws.addEventListener("message", (e) => {
            dispatch(actions.setMessages(JSON.parse(e.data)))
        });
    }, []);

    const sendMessageHandler = (newMessageBody: string) => {
        if (!newMessageBody) { return; }
        ws.send(newMessageBody);
    }

    return <><ChatMessages messages={messages}
                       sendMessage={sendMessageHandler}
                       readyStatus={readyStatus}
                       authUserId={authUserId}/>
            </>;
};

type TPropsChatMessages = {
    readyStatus: TReadyStatus,
    messages: TChatMessage[],
    sendMessage: (newMessageBody: string) => void,
    authUserId: number | null
};

const ChatMessages: React.FC<TPropsChatMessages>
    = ({readyStatus, messages, sendMessage, authUserId}) => {
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

    console.log(readyStatus === "ready");

    return (
        <div className={s.messages}>
            <div className={s.messagesList}> {messagesElements} </div>
            <AddMessageForm onSubmit={addNewMessage} isDisableSubmit={readyStatus !== "ready"} />
        </div>
    );
};


export default ChatPage as React.FC;
