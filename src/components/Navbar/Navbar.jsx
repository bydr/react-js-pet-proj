import s from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={s.navbar}>
            <ul>
                <li className={`${s.item} ${s.active}`}><a href="#">Link item</a></li>
                <li className={s.item}><a href="#">Link item</a></li>
                <li className={s.item}><a href="#">Link item</a></li>
                <li className={s.item}><a href="#">Link item</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
