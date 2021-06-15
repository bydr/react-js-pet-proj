import React from "react";
import styles from "./Avatar.module.css";
import {NavLink} from "react-router-dom";

const Avatar = ({path, url = null}) => {
    return(
        <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
                {
                    url
                        ? <NavLink to={url}> <img src={path} alt="" /> </NavLink>
                        : <img src={path} alt=""/>
                }

            </div>
        </div>
    );
};

export default Avatar;
