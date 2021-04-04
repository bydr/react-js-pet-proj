import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import * as axios from "axios";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/users-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        // get userId from url
        let userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return <Profile {...this.props}
                        profile = {this.props.profile} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

//withRouter возвращает компоненту прокидывая в нее props.match.params
let WithUrlDataContainerComponent = withRouter(ProfileContainer)

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

