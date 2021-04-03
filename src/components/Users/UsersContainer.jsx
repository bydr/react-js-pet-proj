import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {follow, setCurrentPage, setTotalUsersCount, setUsers, unfollow} from "../../redux/users-reducer";
import * as axios from "axios";

class UsersContainer extends React.Component {

    //выполняется после первого рендеринга только на стороне клиента
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged(pageNumber) {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <Users
            totalUsersCount = { this.props.totalUsersCount }
            pageSize = { this.props.pageSize }
            currentPage = { this.props.currentPage }
            onPageChanged = { this.onPageChanged }
            users = { this.props.users }
            unfollow = { this.props.unfollow }
            follow = { this.props.follow }
        />
    };
}

const mapStateToProps = (state) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
});


export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount})(UsersContainer);
