import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = ({profile, status, updateStatus, isOwner, updatePhoto}) => {
    if (!profile) { return <Preloader />; }
    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         updatePhoto={updatePhoto}
            />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
