import s from "./Dialogs.module.css"
import DialogItems from "./DialogItems/DialogItems";
import Messages from "./Messages/Messages";

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <DialogItems />
            <Messages/>
        </div>
    );
}

export default Dialogs;
