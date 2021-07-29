import React, {useEffect} from "react";
import s from "./Users.module.css"
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {follow, requestUsers, unfollow, actions} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";


let Users: React.FC = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const friendState = useSelector((state: AppStateType) => state.usersPage.friendState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(requestUsers(pageNumber, pageSize));
    }

    const followHandler = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowHandler = (userId: number) => {
        dispatch(unfollow(userId));
    }

    let usersElements = users.map(u => <User user={u}
                                             follow={followHandler}
                                             unfollow={unfollowHandler}
                                             followingInProgress={followingInProgress}
                                        />);

    let onChangeFilterFriend = (e: any) => {
        dispatch(requestUsers(currentPage, pageSize, e.currentTarget.value));
    };

    return <div>
        <h3>Users page</h3>
        <Pagination totalItemsCount={totalUsersCount}
                    itemsPerPage={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    partsPerPage={5}
        />
        <select name="filter" onChange={onChangeFilterFriend}>
            { friendState.map(fs => <option value={`${fs.value}`}>{fs.message}</option>) }
        </select>
        <div className={s.userList}>
            {usersElements}
        </div>
    </div>
};

export default Users;
