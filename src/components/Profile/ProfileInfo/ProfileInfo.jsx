import s from "./ProfileInfo.module.css";
import Card from "./Card/Card";
import Header from "./Header/Header"
import CardForm from "./CardForm/CardForm";
import {useState} from "react";

const ProfileInfo = ({profile, status, updateStatus, isOwner, updatePhoto}) => {

    let [isEditMode, setIsEditMode] = useState(false);
    let activateEditMode = () => {
        setIsEditMode(true);
    };
    let deactivateEditMode = () => {
        setIsEditMode(false);
    };

    return (
        <div className={s.profileInfo}>
            <Header/>
            {
                !isEditMode
                ? <Card profile={profile}
                        status={status}
                        updateStatus={updateStatus}
                        isOwner={isOwner}
                        activateEditMode={activateEditMode}
                        updatePhoto={updatePhoto}
                    />
                : <CardForm deactivateEditMode={deactivateEditMode} />
            }

        </div>
    );
}

export default ProfileInfo;
