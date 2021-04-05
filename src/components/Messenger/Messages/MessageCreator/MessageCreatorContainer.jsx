import * as React from "react";
import {
    sendMessage, updateNewMessageText,
} from "../../../../redux/messenger-reducer";
import MessageCreator from "./MessageCreator";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        newMessageText: state.messengerPage.newMessageText
    };
};

export default connect(mapStateToProps, {sendMessage, updateNewMessageText})(MessageCreator);;
