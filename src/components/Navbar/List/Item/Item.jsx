import s from "./Item.module.css";
import {NavLink} from "react-router-dom";


const Item = (props) => {
    return (
            <li className={s.item}>
                <NavLink to={props.item.path}
                         activeClassName={s.active}>
                    {props.item.title}
                </NavLink>
            </li>
    );
}

export default Item;
