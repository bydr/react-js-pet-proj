import React, {useState, useEffect} from "react";
import s from "./ProfileStatus.module.css"

const ProfileStatus = (props) => {

    let [isEditMode, setIsEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    //сработает после отрисовки компонента
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => {
        setIsEditMode(true);
    };
    let deactivateEditMode = () => {
        setIsEditMode(false);
        props.updateStatus(status);
    };
    let onChangeStatus = (e) => {
        setStatus(e.currentTarget.value);
    };

    return <div className={"status"}>
        {
            !isEditMode
            ?
                <div className="status-text" onDoubleClick={ activateEditMode }>
                    <p>{ status || "установить статус" }</p>
                </div>
            :
                <div className={s.statusCreator}>
                    <div className="status-creator__inner">
                        <div className="form-group">
                            <input autoFocus={true}
                                   onBlur={ deactivateEditMode }
                                   onChange={ onChangeStatus }
                                   type="text"
                                   value={status}
                            />
                        </div>
                        <div className="form-group">
                            <button className="drButton">Сохранить</button>
                        </div>
                    </div>
                </div>
        }
    </div>;
}

export default ProfileStatus;
