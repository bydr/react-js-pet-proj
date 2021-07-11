import React, {Props, useEffect, useState} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow, unfollow,
    requestUsers,
    setCurrentPage
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
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
};
type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    requestUsers: (pageNumber: number, pageSize: number) => void
};
type OwnPropsType = {
    pageTitle: string
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

/* повторный рендер пройдёт только при изменении пропсов благодаря React.memo */
const UsersContainer: React.FC<PropsType> = React.memo((
    {
        totalUsersCount, pageSize, currentPage, users,
        unfollow, follow, followingInProgress, isFetching, setCurrentPage, requestUsers,
        pageTitle
    }) => {

    useEffect(() => {
        console.log("UseEffect users");
        requestUsers(currentPage, pageSize);
    }, []);

    let onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        requestUsers(pageNumber, pageSize);
    }

    return (
        <>
            {console.log("RENDER USERSContainer")}
            {isFetching ? <Preloader/> : null}
            <h2>{pageTitle}</h2>
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


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {follow, unfollow, setCurrentPage, requestUsers}),
    withAuthRedirect
)(UsersContainer);
