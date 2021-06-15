import s from "./Friend.module.css";
import Avatar from "../../../common/Avatar/Avatar";
const avatarPath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png';

const Friend = (props) => {
    return(
        <div className={s.item}>
            <div className={s.itemInner}>
                <Avatar path={avatarPath} />
                <div className={s.info}>
                    <p className={s.name}>{props.friend.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Friend;
