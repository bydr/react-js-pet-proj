import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {

    let dialogElements = props.dialogs.map((d) => <Dialog dialog={d} /> );

    return (
        <div className={s.dialogs}>
            {dialogElements}
        </div>
    );
};

export default Dialogs;
