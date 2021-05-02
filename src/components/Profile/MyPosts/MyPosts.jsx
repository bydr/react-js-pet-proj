import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import * as React from "react";
import AddPostForm from "./AddPostForm/AddPostForm";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post key={p.id} post={p}/>);

    let onAddPost = (values) => {
        props.addPost(values.postMessage);
    };

    return (
        <div className={s.myposts}>
            <div className={s.mypostsInner}>
                <div className={s.title}>My Posts</div>
                <AddPostForm onSubmit={onAddPost} />
                <div className={s.posts}>{ postsElements }</div>
            </div>
        </div>
    );
}

export default MyPosts;
