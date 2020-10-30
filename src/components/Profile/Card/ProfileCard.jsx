import s from "./ProfileCard.module.css"

const ProfileCard = () => {
    return (
        <div className={s.card}>
            <div className="profile-card__content">
                <div className="">ava</div>
                <div className="">description</div>
            </div>
        </div>
    );
}

export default ProfileCard;
