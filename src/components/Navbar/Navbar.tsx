import React from "react";
import s from "./Navbar.module.css";
import Friends from "./Friends/Friends";
import List from "./List/List";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const Navbar: React.FC = () => {
    let list = useSelector((state: AppStateType) => state.navbar.list);
    let friends = useSelector((state: AppStateType) => state.navbar.friends);

    return (
        <nav className={s.navbar}>
            <List list={list}/>
            <Friends friends={friends}/>
        </nav>
    );
}

export default Navbar;
