import s from "./Dialog.module.css"
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let path = `/messages/${props.id}`;
    return (
        <div className={s.item}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>
                <div className={s.itemInner}>
                    <div className={s.avatarWrapper}>
                        <div className={s.avatar}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
                        </div>
                    </div>
                    <div className={s.info}>
                        <p className={s.name}>{props.author}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default Dialog;
