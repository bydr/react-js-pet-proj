import React from "react";
import Users from "./Users";
import {connect, useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getIsFetching} from "../../redux/users-selectors";

/* повторный рендер пройдёт только при изменении пропсов благодаря React.memo */
const UsersPage: React.FC = React.memo((props) => {
    const isFetching = useSelector(getIsFetching);
    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    );
});

export default UsersPage as React.FC;
