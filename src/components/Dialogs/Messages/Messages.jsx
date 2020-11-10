import s from "./Messages.module.css"
import Message from "./Message/Message";

const Messages = () => {

    let messages = [
        {message: "Hello?"},
        {message: "Good day"},
        {message: "Hello React"},
        {message: "Greate morning"},
    ];

    let messagesElements = messages.map(m => <Message message={m.message}/>);

    return (
        <div className={s.items}>
            {messagesElements}
        </div>
    );
}

export default Messages;
