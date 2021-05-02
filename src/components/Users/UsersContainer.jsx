import React, {useEffect, useState} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow, unfollow,
    requestUsers,
    setCurrentPage, setTotalUsersCount,
    toggleFollowingProgress,
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

const UsersContainer = React.memo((
    {
        totalUsersCount, pageSize, currentPage, users,
        unfollow, follow, followingInProgress, isFetching, setCurrentPage, requestUsers
    }) => {

    useEffect(() => {
        console.log("UseEffect users");
        requestUsers(currentPage, pageSize);
    }, []);

    let onPageChanged = (pageNumber) => {
        setCurrentPage(pageNumber);
        requestUsers(pageNumber, pageSize);
    }

    return (
        <>
            {console.log("RENDER USERSContainer")}
            {isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                users={users}
                unfollow={unfollow}
                follow={follow}
                followingInProgress={followingInProgress}
            />
        </>
    );
});

const mapStateToProps = (state) => {
    console.log("mapStateToProps USERS");
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};


export default compose(
    connect(mapStateToProps,
        {follow, unfollow, setCurrentPage, setTotalUsersCount, toggleFollowingProgress, requestUsers}),
    withAuthRedirect
)(UsersContainer);
