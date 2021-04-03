import React from "react";
import s from "./Users.module.css"
import userPhoto from "../../assets/img/logo512.png";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
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
                                ${props.currentPage === p && s.selectedPage}`}
                            onClick={ () => { props.onPageChanged(p) } }
                        >{p}</button>
                    </li>
                })}
            </ul>
        </nav>
        <div className={s.userList}>
            {
                props.users.map(
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
                                            ? <button className="drButton drButton_red"
                                                      onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                            : <button className="drButton"
                                                      onClick={() => { props.follow(u.id) }}>Follow</button>
                                    }
                                </div>
                            </div>
                        </div>

                )
            }
        </div>
    </div>;
};

export default Users;
