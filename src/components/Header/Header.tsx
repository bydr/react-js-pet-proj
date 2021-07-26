import s from "./Header.module.css";
import {NavLink} from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

const Header: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const userLogin = useSelector((state: AppStateType) => state.auth.login);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
            <div className={s.loginBlock}>
                {
                    isAuth
                    ?
                        <div className={s.loginUser}>
                            <p>Hello, {userLogin}</p>
                            <button className={"btn-custom__accent"} onClick={ logoutHandler }>Logout</button>
                        </div>
                    : <NavLink className={"btn-custom__accent"} to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
