import s from "./ProfileInfo.module.css";
import Card from "./Card/Card";
import Header from "./Header/Header"

const ProfileInfo = () => {
    return (
        <div className={s.profileInfo}>
            <Header/>
            <Card />
        </div>
    );
}

export default ProfileInfo;
