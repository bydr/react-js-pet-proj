import * as React from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = ({isAuth, ...props}) => {
        if (!isAuth) return <Redirect to={"/login"} />
        return <Component {...props} />
    }

    return connect(mapStateToProps, null)(RedirectComponent);
};

