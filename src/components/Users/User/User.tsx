import React from "react";
import s from "./User.module.css"
import userPhoto from "../../../assets/img/logo512.png";
import Avatar from "../../common/Avatar/Avatar";
import {UserType} from "../../../types/types";
import './User.scss';

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
};

let User: React.FC<PropsType> = ({ user: {id, name, followed, photos, status},
                                     followingInProgress, unfollow, follow}) => {

    return (
        <>
            <div className={`${s.userItem} user-item`} key={id}>
                <Avatar path={photos.small ? photos.small : userPhoto}
                        url={`/profile/${id}`}/>
                <div className={s.userContent}>
                    <p>{name}</p>
                    <p>{status}</p>
                    <p>{"location.country"} {"location.city"}</p>
                    <div>
                        {
                            followed
                                ? <button className="btn-custom__accent btn-custom__red"
                                          onClick={() => { unfollow(id) }}
                                          disabled={ followingInProgress.some(i => i === id) }
                                >Unfollow</button>
                                : <button className="btn-custom__accent"
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
