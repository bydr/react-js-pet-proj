import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import Message from "../../Dialogs/Messages/Message/Message";

console.log(s)

const MyPosts = () => {

    let posts = [
        {message: "Message 01"},
        {message: "Message 02"},
    ];

    let postsElements = posts.map(p => <Post message={p.message}/>);

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
