import React from "react";
import s from "./User.module.css"
import userPhoto from "../../../assets/img/logo512.png";
import {NavLink} from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow}) => {
    let {id: userId, name, status, followed, photos} = user;
    return (
        <>
            <div className={s.userItem} key={userId}>
                <div className={s.userAvatar}>
                    <NavLink to={`/profile/${userId}`}>
                        <img src={photos.small ? photos.small : userPhoto} alt=""
                             className="src"/>
                    </NavLink>
                </div>
                <div className={s.userContent}>
                    <p>{name}</p>
                    <p>{status}</p>
                    <p>{"location.country"} {"location.city"}</p>
                    <div>
                        {
                            followed
                                ? <button className="drButton drButton_red"
                                          onClick={() => { unfollow(userId) }}
                                          disabled={ followingInProgress.some(id => id === userId) }
                                >Unfollow</button>
                                : <button className="drButton"
                                          onClick={() => { follow(userId) }}
                                          disabled={ followingInProgress.some(id => id === userId) }
                                >Follow</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
