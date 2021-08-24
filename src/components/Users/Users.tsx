import React, {useCallback, useEffect} from "react";
import s from "./Users.module.css"
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersSelector
} from "../../redux/users-selectors";
import {actions, follow, getUsers, unfollow} from "../../redux/users-reducer";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {TFilterUsers} from "../../types/types";
import {useHistory} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


let Users: React.FC = React.memo((props) => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsersSelector);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector((state: AppStateType) => state.usersPage.filter);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log('useEffect [filter] ', filter);
        // debugger;
        // history.push({
        //     pathname: '/users',
        //     search: `?term=${filter.term}&friend=${filter.friend}`
        // });
    }, [filter]);

    useEffect(() => {
        console.log('useEffect []');
        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const followHandler = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowHandler = (userId: number) => {
        dispatch(unfollow(userId));
    }

    let usersElements = users.map(u => <User user={u}
                                             key={u.id}
                                             follow={followHandler}
                                             unfollow={unfollowHandler}
                                             followingInProgress={followingInProgress}
                                        />);

    let onFilterChanged = (filter: TFilterUsers) => {
        return Promise.all([
            dispatch(actions.setFilter(filter)),
            dispatch(getUsers(currentPage, pageSize, filter)),
            dispatch(actions.setCurrentPage(1)),
        ]).then(() => true);
    };

    return <div>
        <h3>Users page</h3>
        <Pagination totalItemsCount={totalUsersCount}
                    itemsPerPage={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    partsPerPage={5}
        />
        {/*<select name="filter" onChange={onFilterChanged}>*/}
        {/*    { friendState.map(fs => <option value={`${fs.value}`}>{fs.message}</option>) }*/}
        {/*</select>*/}
        <button onClick={() => {
            history.replace({
                pathname: '/users',
                search: `?term=${filter.term}&friend=${filter.friend}`
            });
        }}>Click</button>
        <UsersSearchForm onSubmit={onFilterChanged} />
        <div className={s.userList}>
            {usersElements}
        </div>
    </div>
});

export default Users;
