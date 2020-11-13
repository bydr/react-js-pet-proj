import s from "./Message.module.css"

const Message = (props) => {
    return (
        <div className={s.item}>
            <p>{props.message.message}</p>
        </div>
    );
}

export default Message;
