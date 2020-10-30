import s from "./MyPosts.module.css";
import Post from "./Post/Post";

console.log(s)

const MyPosts = () => {
    return (
        <div className={s.myposts}>
            <div className={s.mypostsWrapper}>
                <div className="title">My Posts</div>
                <div className="form-group">
                    <textarea name="myposts-message" id="id-myposts-message" cols="30" rows="10" ></textarea>
                </div>
                <div className="form-group justify-content-end">
                    <button>Send</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message="Message 01"/>
                <Post message="Message 02"/>
            </div>
        </div>
    );
}

export default MyPosts;
