import s from "./DialogItems.module.css"
import Dialog from "./Dialog/Dialog";

const DialogItems = () => {
    let dialogs = [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Daniil'},
        {id: 3, name: 'Petya'},
        {id: 4, name: 'Valery'},
        ];

    let dialogsElements = dialogs.map((d) => <Dialog id={d.id} author={d.name} /> );

    return (
        <div className={s.items}>
            { dialogsElements }
        </div>
    );
}

export default DialogItems;
