import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import {sendMessage} from "../../redux/messenger-reducer";
import {DialogType, MessageType} from "../../types/types";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


const Messenger: React.FC = (props) => {

    const dialogs = useSelector((state: AppStateType) => state.messengerPage.dialogs);
    const messages = useSelector((state: AppStateType) => state.messengerPage.messages);

    const dispatch = useDispatch();

    const sendMessageHandler = (newMessageBody: string) => {
        dispatch(sendMessage(newMessageBody));
    };

    return (
        <div className={s.messenger}>
            <Dialogs dialogs={dialogs}/>
            <Messages messages={messages}
                      sendMessage={sendMessageHandler}/>
        </div>
    );
}

export default Messenger;
