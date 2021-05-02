import s from "./Navbar.module.css";
import Friends from "./Friends/Friends";
import List from "./List/List";
import {connect} from "react-redux";

const Navbar = ({list, friends}) => {
    return (
        <nav className={s.navbar}>
            <List list={list}/>
            <Friends friends={friends}/>
        </nav>
    );
}

let mapStateToProps = (state) => ({
        list: state.navbar.list,
        friends: state.navbar.friends
    });

export default connect(mapStateToProps, null)(Navbar);
