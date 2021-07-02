import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const ProfileContainer = ({authUserId, getProfile, getStatus, ...props}) => {

    let refreshProfile = () => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                return <Redirect to={"/login"} />;
                // this.props.history.push("/login");
            }
        }
        getProfile(userId);
        getStatus(userId);
    }

    useEffect(() => {
        refreshProfile();
    }, [props.match.params.userId, authUserId]);

    return <Profile {...props}
                    isOwner={!props.match.params.userId} />
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
});

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
//withRouter возвращает компоненту прокидывая в нее props.match.params
//наш withAuthRedirect возвращает компоненту либо Redirect либо "Правильную"
export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

