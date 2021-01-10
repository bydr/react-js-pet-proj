import s from "./Messages.module.css"
import Message from "./Message/Message";
import MessageCreator from "./MessageCreator/MessageCreator"

const Messages = (props) => {

    let messagesElements = props.messages.map(m => <Message message={m}/>);

    return (
        <div className={s.messages}>
            <div className={s.messagesList}>
                {messagesElements}
            </div>
            <MessageCreator newMessageText = {props.newMessageText}
                            dispatch={props.dispatch}/>
        </div>
    );
}

export default Messages;
