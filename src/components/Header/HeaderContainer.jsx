import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthMe} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthMe();
    }

    render() {
        return <Header {...this.props} />;
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userLogin: state.auth.login
    };
};

export default connect(mapStateToProps, {getAuthMe})(HeaderContainer);
