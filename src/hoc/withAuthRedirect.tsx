import * as React from "react";
import {Redirect} from "react-router";
import {connect, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";

export const withAuthRedirect = (Component: any) => {
    const RedirectComponent: React.FC = ({...props}) => {
        const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

        if (!isAuth) return <Redirect to={"/login"} />
        return <Component {...props} />
    }

    return RedirectComponent;
};

