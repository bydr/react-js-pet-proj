import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";

const Messenger = (props) => {
    return (
        <div className={s.messenger}>
            <Dialogs dialogs={props.state.dialogs}/>
            <Messages messages={props.state.messages}/>
        </div>
    );
}

export default Messenger;
