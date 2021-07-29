import s from "./Dialog.module.css"
import {NavLink} from "react-router-dom";
import Avatar from "../../../common/Avatar/Avatar";
const avatarPath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png';

const Dialog = (props) => {
    let path = `/messenger/${props.dialog.id}`;
    return (
        <div className={s.item}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>
                <div className={s.itemInner}>
                    <Avatar path={avatarPath} />
                    <div className={s.info}>
                        <p className={s.name}>{props.dialog.name}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default Dialog;
