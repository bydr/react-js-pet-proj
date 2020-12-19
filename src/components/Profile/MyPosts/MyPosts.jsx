import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import * as React from "react";

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post post={p}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={s.myposts}>
            <div className={s.mypostsWrapper}>
                <div className={s.title}>My Posts</div>
                <div className="form-group">
                    <textarea className="form-control"
                              name="myposts-message"
                              id="id-myposts-message"
                              ref={newPostElement}
                              value={props.newPostText}
                              onChange={onPostChange}
                              cols="30"
                              rows="7"></textarea>
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton" onClick={addPost}>Send</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
