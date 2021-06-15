import React from "react";
import s from "./User.module.css"
import userPhoto from "../../../assets/img/logo512.png";
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar";

let User = ({ user: {id, name, status, followed, photos},
                followingInProgress, unfollow, follow}) => {
    return (
        <>
            <div className={s.userItem} key={id}>
                <Avatar path={photos.small ? photos.small : userPhoto}
                        url={`/profile/${id}`}/>
                <div className={s.userContent}>
                    <p>{name}</p>
                    <p>{status}</p>
                    <p>{"location.country"} {"location.city"}</p>
                    <div>
                        {
                            followed
                                ? <button className="drButton drButton_red"
                                          onClick={() => { unfollow(id) }}
                                          disabled={ followingInProgress.some(i => i === id) }
                                >Unfollow</button>
                                : <button className="drButton"
                                          onClick={() => { follow(id) }}
                                          disabled={ followingInProgress.some(i => i === id) }
                                >Follow</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
