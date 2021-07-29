import s from "./Card.module.css"
import sprite from "../../../../assets/img/sprite.svg";
import userPhoto from "../../../../assets/img/logo512.png";
import ProfileStatus from "../../ProfileStatus/ProfileStatusWithHooks";
import Avatar from "../../../common/Avatar/Avatar";
import UploaderFile from "../../../common/UploaderFile/UploaderFile";
import {useState} from "react";
import Popup from "../../../common/Popup/Popup";

const Card = ({profile: {contacts, ...profile}, status, updateStatus, isOwner, activateEditMode, updatePhoto}) => {

    let renderElementContact = (icon, path) => {
        if (!path) return;
        return <a className="contacts-list__item" href={path} target="_blank">
                    <svg className="dr-icon"><use xlinkHref={`${sprite}#ic_${icon}`}></use></svg>
                </a>;
    };
    let arContacts = [
        {icon: "fb", path: contacts.facebook},
        {icon: "github", path: contacts.github},
        {icon: "inst", path: contacts.instagram},
        {icon: "branch", path: contacts.mainLink},
        {icon: "twitter", path: contacts.twitter},
        {icon: "web", path: contacts.website},
        {icon: "youtube", path: contacts.youtube},
        {icon: "vk", path: contacts.vk},
    ];

    return (
        <div className={s.card}>
            <div className={s.content}>
                <div className={s.contentColumn}>
                    <AvatarProfile isOwner={isOwner}
                                   photo={profile.photos.large}
                                   updatePhoto={updatePhoto}
                    />
                </div>
                <div className={s.contentColumn}>
                    <div className={s.info}>
                        <div className={`${s.infoGroup} ${s.infoMain}`}>
                            <div className={s.infoTitleWrapper}>
                                <h2 className={s.infoTitle}>{ profile.fullName }</h2>
                                {
                                    isOwner && <button onClick={activateEditMode}
                                                       className="btn-custom__accent btn-custom__box_40
                                                        btn-custom__transparentize">
                                        <svg className="dr-icon"><use xlinkHref={`${sprite}#ic_edit`}></use></svg></button>
                                }
                            </div>

                            <p>{profile.aboutMe}</p>
                            <ProfileStatus status={status}
                                           updateStatus={updateStatus}
                                           isOwner={isOwner}
                            />
                        </div>
                        <div className={`${s.infoGroup} ${s.infoAJob}`}>
                            <p className={`${s.infoGroupTitle}`}><b>Работа</b></p>
                            <div className={`${s.infoGroupContent}`}>
                                {
                                    profile.lookingForAJob
                                        ? <div className="c-accent">Ищу работу</div>
                                        : <div className="c-gray">Не ищу работу</div>
                                }
                                <p>{ profile.lookingForAJobDescription }</p>
                            </div>
                        </div>
                        <div className={`${s.infoGroup} ${s.infoContacts}`}>
                            <p className={`${s.infoGroupTitle}`}><b>Контакты</b></p>
                            <div className={`${s.infoGroupContent}`}>
                                <div className="contacts-list">
                                    { arContacts.map(item => renderElementContact(item.icon, item.path)) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

const AvatarProfile = ({isOwner, photo, updatePhoto}) => {

    let [isShowPopup, setIsShowPopup] = useState(false);
    let showPopup = () => {
        setIsShowPopup(true);
    };
    let hidePopup = () => {
        setIsShowPopup(false);
    };

    return <div className={s.avatarWrapper}>
        <Avatar path={photo ? photo : userPhoto} />
        { isOwner &&
            <>
                <button onClick={showPopup}>Обновить</button>
                <Popup hidePopup={hidePopup}
                       isShow={isShowPopup}>
                    <UploaderFile extendsClass={s.uploadFile}
                                  isShowPopup={isShowPopup}
                                  handlerUpload={updatePhoto}
                                  hidePopup={hidePopup}
                    />
                </Popup>
            </>
         }
    </div>;
};

export default Card;
