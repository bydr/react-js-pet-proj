import s from "./CardForm.module.css"

const CardForm = ({deactivateEditMode, ...props}) => {
    return (
        <div>
            Form Card
            <div><button onClick={deactivateEditMode}
                         className="btn-custom__accent">Отменить</button></div>
        </div>
    );
}

export default CardForm;
