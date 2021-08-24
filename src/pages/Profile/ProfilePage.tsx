import React from "react";
import Profile from "../../components/Profile/Profile";
import {useParams, withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Helmet} from "react-helmet";

type TParams = {
    userId?: string
};

const ProfilePage: React.FC = React.memo((props) => {
    const {userId} = useParams<TParams>();
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Profile page</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Profile paramsUserId={userId} {...props} />
    </>
});

//connect возвращает компоненту прокидывая в нее props mapStateToProps и коллбэки
//withRouter возвращает компоненту прокидывая в нее props.match.params
//наш withAuthRedirect возвращает компоненту либо Redirect либо "Правильную"
export default ProfilePage as React.FC;

