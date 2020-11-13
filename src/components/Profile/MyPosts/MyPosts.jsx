import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import Message from "../../Messenger/Messages/Message/Message";

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post post={p}/>);

    return (
        <div className={s.myposts}>
            <div className={s.mypostsWrapper}>
                <div className={s.title}>My Posts</div>
                <div className="form-group">
                    <textarea className="form-control" name="myposts-message" id="id-myposts-message" cols="30" rows="7"></textarea>
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton">Send</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
