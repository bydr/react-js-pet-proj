import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPosts posts={props.state.posts}
                     newPostText={props.state.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText} />
        </div>
    );
}

export default Profile;
