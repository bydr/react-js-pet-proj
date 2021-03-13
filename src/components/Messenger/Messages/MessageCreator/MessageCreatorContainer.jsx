import * as React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../../redux/messenger-reducer";
import MessageCreator from "./MessageCreator";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        newMessageText: state.messengerPage.newMessageText
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        updateNewMessageText: (text) => {
            let action = updateNewMessageTextActionCreator(text)
            dispatch(action);
        }
    };
};

const MessageCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(MessageCreator);

export default MessageCreatorContainer;
