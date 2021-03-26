import s from "./Users.module.css"
import React from "react";
import userPhoto from "../../assets/img/logo512.png";
import * as axios from "axios";


class Users extends React.Component {

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

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>
            <h3>Users page</h3>
            <nav className={s.pagination}>
                <ul className={s.paginationList}>
                    {pages.map(p => {
                       return <li>
                            <button
                                className={`
                                ${s.paginationBtn} 
                                ${this.props.currentPage === p && s.selectedPage}`}
                                onClick={ () => { this.onPageChanged(p) } }
                            >{p}</button>
                        </li>
                    })}
                </ul>
            </nav>
            <div className={s.userList}>
                {
                    this.props.users.map(
                        u =>
                            <div className={s.userItem} key={u.id}>
                                <div className={s.userAvatar}>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt=""
                                         className="src"/>
                                </div>
                                <div className={s.userContent}>
                                    <p>{u.name}</p>
                                    <p>{u.status}</p>
                                    <p>{"u.location.country"} {"u.location.city"}</p>
                                    <div>
                                        {
                                            u.followed
                                                ? <button className="drButton drButton_red" onClick={() => {
                                                    this.props.unFollow(u.id)
                                                }}>Unfollow</button>
                                                : <button className="drButton" onClick={() => {
                                                    this.props.follow(u.id)
                                                }}>Follow</button>
                                        }
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    };
}

export default Users;
