import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router";
import React, {useEffect} from "react";
import {actions, getProfile, getStatus, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {Helmet} from "react-helmet";
import MyPosts from "./MyPosts/MyPosts";

type PropsType = {
    paramsUserId: string | undefined;
};

const Profile: React.FC<PropsType> = React.memo(({paramsUserId}) => {

    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    const status = useSelector((state: AppStateType) => state.profilePage.status);
    const authUserId = useSelector((state: AppStateType) => state.auth.userId);
    const isFetching = useSelector((state: AppStateType) => state.profilePage.isFetching);

    const dispatch = useDispatch();

    let refreshProfile = () => {
        let userId: string | undefined | number | null = paramsUserId;
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                return <Redirect to={"/login"} />;
            }
        }
        dispatch(getProfile(userId as number));
        dispatch(getStatus(userId as number));
    }


    useEffect(() => {
        refreshProfile();
    }, [paramsUserId, authUserId]);

    const updateStatusHandler = (status: string) => {
        dispatch(updateStatus(status));
    }

    const updatePhotoHandler = (photosFile: any) => {
        dispatch(updatePhoto(photosFile));
    }

    return <>
        {
            (profile !== null && !isFetching)
                ? <div className={s.profile}>
                <Helmet>
                    <title>{profile.fullName}</title>
                    <meta name="description" content={`Profile page user ${profile.fullName}`} />
                </Helmet>
                <ProfileInfo profile={profile}
                             status={status}
                             isOwner={!paramsUserId}
                             updateStatus={updateStatusHandler}
                             updatePhoto={updatePhotoHandler}
                />
                <MyPosts />
            </div>
                : ''
        }
    </>

});

export default Profile;
