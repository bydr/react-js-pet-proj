import s from "./Messages.module.css"
import Message from "./Message/Message";
import AddMessageReduxForm from "./AddMessageForm/AddMessageForm";

const Messages = (props) => {
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m}/>);

    let addNewMessage = (values) => {
        console.log(values);
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.messages}>
            <div className={s.messagesList}> {messagesElements} </div>
            <AddMessageReduxForm onSubmit={addNewMessage} />
        </div>
    );
};

export default Messages;
