import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStateToPropsType = {
    profile: ProfileType | null,
    authUserId: number | null,
    isAuth: boolean,
    status: string
};
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    updatePhoto: (photosFile: any) => void
};
type MatchParamsType = {
    userId?: string | undefined;
};
type OwnPropsType = {};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouteComponentProps<MatchParamsType>;

const ProfileContainer: React.FC<PropsType> = (
    {authUserId, getProfile, getStatus, match: {params}, ...props}) => {

    let refreshProfile = () => {
        let userId: string | undefined | number | null = params.userId;
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                return <Redirect to={"/login"} />;
                // this.props.history.push("/login");
            }
        }
        getProfile(userId as number);
        getStatus(userId as number);
    }

    useEffect(() => {
        refreshProfile();
    }, [params.userId, authUserId]);

    return <Profile {...props}
                    isOwner={!params.userId} />
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
});

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
//withRouter возвращает компоненту прокидывая в нее props.match.params
//наш withAuthRedirect возвращает компоненту либо Redirect либо "Правильную"
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

