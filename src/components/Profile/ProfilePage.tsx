import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MatchParamsType = {
    userId?: string | undefined;
};
type PropsType = RouteComponentProps<MatchParamsType>;

const ProfilePage: React.FC<PropsType> = ({match: {params}, ...props}) => {
    return <Profile paramsUserId={params.userId} {...props} />
}

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
//withRouter возвращает компоненту прокидывая в нее props.match.params
//наш withAuthRedirect возвращает компоненту либо Redirect либо "Правильную"
export default compose(withRouter,withAuthRedirect)(ProfilePage) as React.FC;

