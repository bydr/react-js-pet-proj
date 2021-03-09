import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";

const Messenger = (props) => {

    let state = props.store.getState();

    return (
        <div className={s.messenger}>
            <Dialogs dialogs={state.messengerPage.dialogs}/>
            <Messages store = {props.store} />
        </div>
    );
}

export default Messenger;
