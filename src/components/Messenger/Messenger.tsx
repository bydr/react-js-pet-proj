import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import {sendMessage} from "../../redux/messenger-reducer";
import {DialogType, MessageType} from "../../types/types";
import React from "react";

type PropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    sendMessage: (newMessageBody: string) => void
};

const Messenger: React.FC<PropsType> = ({dialogs, messages, sendMessage}) => {
    return (
        <div className={s.messenger}>
            <Dialogs dialogs={dialogs}/>
            <Messages messages={messages}
                      sendMessage={sendMessage}/>
        </div>
    );
}

export default Messenger;
