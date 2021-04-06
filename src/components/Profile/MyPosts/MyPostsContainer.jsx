import * as React from "react";
import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

class MyPostsContainer extends React.Component {
    render() {
        return <MyPosts {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts
});

export default connect(mapStateToProps, {addPost})(MyPostsContainer);
