import * as React from "react";
import s from "./MessageCreator.module.css"
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../../redux/messenger-reducer";


const MessageCreator = (props) => {

    let sendMessage = () => {
        props.dispatch(sendMessageActionCreator());
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    };

    return (
        <div className={s.messageCreator}>
            <div className={s.messageCreatorWrapper}>
                <div className="form-group">
                    <textarea className={s.formControl}
                              name="message"
                              id="id-message"
                              value={props.newMessageText}
                              onChange={onMessageChange}
                              cols="30"
                              rows="7"></textarea>
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default MessageCreator;
