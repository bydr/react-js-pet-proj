import s from "./Messages.module.css"
import Message from "./Message/Message";
import MessageCreatorContainer from "./MessageCreator/MessageCreatorContainer";

const Messages = (props) => {
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m}/>);

    return (
        <div className={s.messages}>
            <div className={s.messagesList}>
                {messagesElements}
            </div>
            <MessageCreatorContainer />
        </div>
    );
}

export default Messages;
