import s from "./Messenger.module.css";
import Dialogs from "./Dialogs/Dialogs";
import MessagesContainer from "./Messages/MessagesContainer";

const Messenger = (props) => {

    let state = props.store.getState();

    return (
        <div className={s.messenger}>
            <Dialogs dialogs={state.messengerPage.dialogs}/>
            <MessagesContainer />
        </div>
    );
}

export default Messenger;
