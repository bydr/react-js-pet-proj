import s from "./Friend.module.css";

const Friend = (props) => {
    return(
        <div className={s.item}>
            <div className={s.itemInner}>
                <div className={s.avatarWrapper}>
                    <div className={s.avatar}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
                    </div>
                </div>
                <div className={s.info}>
                    <p className={s.name}>{props.friend.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Friend;
