import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";

const Messenger = (props) => {
    return (
        <div className={s.messenger}>
            <Dialogs dialogs={props.dialogs}/>
            <Messages messages={props.messages}
                      sendMessage={props.sendMessage}/>
        </div>
    );
}

export default Messenger;
