import s from "./Header.module.css";
import {NavLink} from "react-router-dom"
import React from "react";

type PropsType = {
    isAuth: boolean,
    userLogin: string | null,
    logout: () => void
};

const Header: React.FC<PropsType> = ({isAuth, userLogin, logout}) => {
    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
            <div className={s.loginBlock}>
                {
                    isAuth
                    ?
                        <div className={s.loginUser}>
                            <p>Hello, {userLogin}</p>
                            <button className={"btn-custom__accent"} onClick={ () => { logout(); } }>Logout</button>
                        </div>
                    : <NavLink className={"btn-custom__accent"} to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
