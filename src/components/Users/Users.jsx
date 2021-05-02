import React from "react";
import s from "./Users.module.css"
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";

let Users = (props) => {
    let usersElements = props.users.map(u => <User user={u}
                                                   followingInProgress={props.followingInProgress}
                                                   follow={props.follow}
                                                   unfollow={props.unfollow}/>);

    return <div>
        <h3>Users page</h3>
        <Pagination totalItemsCount={props.totalUsersCount}
                    itemsPerPage={props.pageSize}
                    currentPage={props.currentPage}
                    onPageChanged={props.onPageChanged}/>
        <div className={s.userList}>
            {usersElements}
        </div>
    </div>
};

export default Users;
