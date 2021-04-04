import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router";

class ProfileContainer extends React.Component {

    getUserId = () => {
        // get userId from url
        if (this.props.match.params.userId) {
            return this.props.match.params.userId;
            // get userId current user
        } else if (this.props.isAuthUser) {
            return this.props.authUserId;
        } else {
            return 2;
        }
    }

    componentDidMount() {
        let userId = this.getUserId();
        this.props.getProfile(userId);
    }

    render() {
        return <Profile {...this.props}
                        profile = {this.props.profile} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuthUser: state.auth.isAuth,
    authUserId: state.auth.userId,
});

//withRouter возвращает компоненту прокидывая в нее props.match.params
let WithUrlDataContainerComponent = withRouter(ProfileContainer)

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);

