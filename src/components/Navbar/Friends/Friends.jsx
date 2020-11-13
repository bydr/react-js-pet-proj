import s from "./Friends.module.css";
import Friend from "./Friend/Friend";

const Friends = (props) => {
    let friendsElements = props.friends.map(f => <Friend friend={f}/>);

    return(
        <div className={s.friends}>
            <h3>Friends</h3>
            <div className={s.friendsList}>
                {friendsElements}
            </div>

        </div>
    );
}

export default Friends;
