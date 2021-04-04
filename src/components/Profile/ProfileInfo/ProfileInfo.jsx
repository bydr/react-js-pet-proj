import s from "./ProfileInfo.module.css";
import Card from "./Card/Card";
import Header from "./Header/Header"

const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfo}>
            <Header/>
            <Card profile={props.profile} />
        </div>
    );
}

export default ProfileInfo;
