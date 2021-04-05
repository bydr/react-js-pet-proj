import * as React from "react";
import s from "./MessageCreator.module.css"

const MessageCreator = (props) => {

    let messageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    };

    return (
        <div className={s.messageCreator}>
            <div className={s.messageCreatorWrapper}>
                <div className="form-group">
                    <textarea className={s.formControl}
                              name="message"
                              id="id-message"
                              value={props.newMessageText}
                              onChange={messageChange}
                              cols="30"
                              rows="7"> </textarea>
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton" onClick={() => { props.sendMessage() }}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default MessageCreator;
