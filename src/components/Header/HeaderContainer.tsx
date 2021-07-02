import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {log} from "util";

type MapStateToPropsType = {
    isAuth: boolean,
    userLogin: string | null
};
type MapDispatchToPropsType = {
    logout: () => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />;
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
        isAuth: state.auth.isAuth,
        userLogin: state.auth.login
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);
