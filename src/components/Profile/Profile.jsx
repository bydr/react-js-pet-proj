import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import Card from "./Card/Card";
import Header from "./Header/Header";

const Profile = () => {
    return (
        <div className={s.profile}>
            <Header/>
            <Card/>
            <MyPosts/>
        </div>
    );
}

export default Profile;
