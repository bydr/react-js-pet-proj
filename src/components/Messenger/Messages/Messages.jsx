import s from "./Messages.module.css"
import Message from "./Message/Message";
import MessageCreatorContainer from "./MessageCreator/MessageCreatorContainer";

const Messages = (props) => {
    let state = props.store.getState();
    let messagesElements = state.messengerPage.messages.map(m => <Message message={m}/>);

    return (
        <div className={s.messages}>
            <div className={s.messagesList}>
                {messagesElements}
            </div>
            <MessageCreatorContainer store = {props.store}/>
        </div>
    );
}

export default Messages;
