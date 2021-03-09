import * as React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../../redux/messenger-reducer";
import MessageCreator from "./MessageCreator";


const MessageCreatorContainer = (props) => {

    let state = props.store.getState();

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator());
    };

    let onMessageChange = (text) => {
        let action = updateNewMessageTextActionCreator(text)
        props.store.dispatch(action);
    };

    return (
        <MessageCreator
            sendMessage = {onSendMessageClick}
            messageChange = {onMessageChange}
            newMessageText = {state.messengerPage.newMessageText} />
    );
};

export default MessageCreatorContainer;
