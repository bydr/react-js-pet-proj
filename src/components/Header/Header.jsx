import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
            <div className={s.loginBlock}>
                {
                    props.isAuth
                    ?
                        <div className={s.loginUser}>
                            <p>Hello, {props.userLogin}</p>
                            <button className={"drButton"} onClick={ () => { props.logout(); } }>Logout</button>
                        </div>
                    : <NavLink className={"drButton"} to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
