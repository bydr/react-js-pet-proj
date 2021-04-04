import React from "react";
import s from "./Users.module.css"
import userPhoto from "../../assets/img/logo512.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {

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
                                ${props.currentPage === p ? s.selectedPage : ''}`}
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
                                <NavLink to={`/profile/${u.id}`}>
                                    <img src={u.photos.small ? u.photos.small : userPhoto} alt=""
                                         className="src"/>
                                </NavLink>
                            </div>
                            <div className={s.userContent}>
                                <p>{u.name}</p>
                                <p>{u.status}</p>
                                <p>{"u.location.country"} {"u.location.city"}</p>
                                <div>
                                    {
                                        u.followed
                                            ? <button className="drButton drButton_red"
                                                      onClick={() => {

                                                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                              withCredentials: true,
                                                              headers: {
                                                                  "API-KEY" : "b8aff7f7-7d3f-4ed3-a7cd-eed0094e44d6"
                                                              }
                                                          })
                                                              .then(response => {
                                                                  if (response.data.resultCode === 0) {
                                                                      props.unfollow(u.id);
                                                                  }
                                                              });

                                                      }}>Unfollow</button>
                                            : <button className="drButton"
                                                      onClick={() => {

                                                          axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                                              withCredentials: true,
                                                              headers: {
                                                                  "API-KEY" : "b8aff7f7-7d3f-4ed3-a7cd-eed0094e44d6"
                                                              }
                                                          })
                                                              .then(response => {
                                                                  if (response.data.resultCode === 0) {
                                                                      props.follow(u.id);
                                                                  }
                                                              });

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

export default Users;
