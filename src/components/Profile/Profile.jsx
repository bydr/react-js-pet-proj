import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import Post from "./MyPosts/Post/Post";
import ProfileCard from "./Card/ProfileCard";
import Header from "./Header/Header";

const Profile = () => {
    return (
        <div className="profile">
            <Header/>
            <ProfileCard/>
            <MyPosts/>
        </div>
    );
}

export default Profile;
