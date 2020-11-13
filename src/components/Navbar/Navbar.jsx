import s from "./Navbar.module.css";
import Friends from "./Friends/Friends";
import List from "./List/List";


const Navbar = (props) => {
    return (
        <nav className={s.navbar}>
            <List list={props.state.list}/>
            <Friends friends={props.state.friends}/>
        </nav>
    );
}

export default Navbar;
