import React from "react";
import s from "./Users.module.css"
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";
import {UserType} from "../../types/types";

type PropsType = {
    users: Array<UserType>,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
};

let Users: React.FC<PropsType> = ({
                                      users,
                                      followingInProgress,
                                      follow,
                                      unfollow,
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged}) => {
    let usersElements = users.map(u => <User user={u}
                                                   followingInProgress={followingInProgress}
                                                   follow={follow}
                                                   unfollow={unfollow}/>);

    return <div>
        <h3>Users page</h3>
        <Pagination totalItemsCount={totalUsersCount}
                    itemsPerPage={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}/>
        <div className={s.userList}>
            {usersElements}
        </div>
    </div>
};

export default Users;
